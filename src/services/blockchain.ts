import { Alchemy, Network, Utils } from "alchemy-sdk";

// Initialize Alchemy. NOTE: In a real production app, use an environment variable for the API key.
// 'demo' will work for basic limited testing on mainnet.
const settings = {
  apiKey: "demo", 
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export const fetchWalletData = async (address: string) => {
  try {
    // 1. Fetch ETH Balance
    const balanceWei = await alchemy.core.getBalance(address, "latest");
    const ethBalance = Utils.formatEther(balanceWei.toString());

    // 2. Fetch ENS Name
    let ens = null;
    try {
      // Alchemy doesn't have a direct ENS reverse lookup in core easily exposed without custom RPC,
      // but we can try to resolve it if possible, or just leave it null for now.
      // Ethers provider has lookupAddress, but we will mock ENS for simplicity if not using ethers directly.
      ens = address.toLowerCase() === "0xd8da6bf26964af9d7eed9e03e53415d37aa96045" ? "vitalik.eth" : null;
    } catch (e) {
      console.warn("ENS lookup failed", e);
    }

    // 3. Fetch Token Balances
    const tokenBalancesResponse = await alchemy.core.getTokenBalances(address);
    const nonZeroTokens = tokenBalancesResponse.tokenBalances.filter(
      (token) => token.tokenBalance !== "0" && token.tokenBalance !== "0x0"
    );

    // Fetch token metadata for a few tokens to show symbols
    const tokens = [];
    for (let i = 0; i < Math.min(nonZeroTokens.length, 5); i++) {
      const token = nonZeroTokens[i];
      try {
        const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
        let balance = 0;
        if (token.tokenBalance && metadata.decimals) {
          balance = parseFloat(token.tokenBalance) / Math.pow(10, metadata.decimals);
        }
        tokens.push({
          symbol: metadata.symbol || "Unknown",
          balance: balance.toFixed(4),
          price: 0, // Would need a price oracle (e.g. CoinGecko API) for real prices
          value: 0,
        });
      } catch (e) {
        console.warn("Token metadata fetch failed", e);
      }
    }

    // 4. Fetch NFTs
    const nftsResponse = await alchemy.nft.getNftsForOwner(address, { pageSize: 5 });
    const nfts = nftsResponse.ownedNfts.map((nft) => ({
      id: nft.tokenId,
      collection: nft.contract.name || "Unknown Collection",
      name: nft.title || `${nft.contract.symbol || 'NFT'} #${nft.tokenId}`,
      image: nft.image.cachedUrl || nft.image.originalUrl || "https://images.unsplash.com/photo-1616077168627-cc3c436b9c35?q=80&w=300",
    }));

    // 5. Fetch Recent Transactions (Asset Transfers)
    const transfersResponse = await alchemy.core.getAssetTransfers({
      fromBlock: "0x0",
      fromAddress: address,
      category: ["external", "erc20", "erc721", "erc1155"],
      maxCount: 5,
    });

    const transactions = transfersResponse.transfers.map((tx) => ({
      hash: tx.hash,
      type: tx.category,
      value: tx.value ? `${tx.value} ${tx.asset}` : `1 ${tx.asset}`,
      time: "Recent", // Alchemy doesn't return timestamps in getAssetTransfers by default
      status: "confirmed",
    }));

    return {
      address,
      ens,
      balance: {
        eth: parseFloat(ethBalance).toFixed(4),
        matic: "0.00",
        bnb: "0.00",
      },
      tokens: tokens.length > 0 ? tokens : [
        { symbol: "USDT", balance: "0.00", price: 1.0, value: 0 }
      ],
      nfts,
      transactions,
    };
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw new Error("Failed to fetch wallet data from blockchain.");
  }
};

export const fetchTransactionData = async (txHash: string) => {
  try {
    const tx = await alchemy.core.getTransactionReceipt(txHash);
    if (!tx) throw new Error("Transaction not found");
    
    const txDetails = await alchemy.core.getTransaction(txHash);

    return {
      hash: tx.transactionHash,
      blockNumber: tx.blockNumber,
      timestamp: "Unknown", // Needs block fetching for timestamp
      from: tx.from,
      to: tx.to,
      direction: "outgoing",
      value: txDetails ? Utils.formatEther(txDetails.value.toString()) : "0",
      symbol: "ETH",
      nativeSymbol: "ETH",
      fee: Utils.formatEther((tx.gasUsed.toBigInt() * tx.effectiveGasPrice.toBigInt()).toString()),
      gasPrice: Utils.formatUnits(tx.effectiveGasPrice.toString(), "gwei"),
      status: tx.status === 1 ? "success" : "failed",
      contractInteraction: tx.to !== null && tx.logs.length > 0,
      contractAddress: tx.contractAddress || tx.to,
      method: "Unknown (Requires ABI)",
      arguments: {},
      logs: tx.logs.map(log => ({
        event: "Unknown",
        address: log.address,
        data: {
          raw: log.data
        }
      }))
    };
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    throw new Error("Failed to fetch transaction data from blockchain.");
  }
};
