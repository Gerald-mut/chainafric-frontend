
import { useState, useEffect } from 'react';

// This is a mock service for demo purposes
// In a real app, you would use ethers.js or web3.js to interact with the blockchain
const fetchWalletData = async (address: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    address,
    ens: address === "0x123456789" ? "afritracker.eth" : null,
    balance: {
      eth: "1.324",
      matic: "245.67",
      bnb: "5.432",
    },
    tokens: [
      { symbol: "USDT", balance: "1,234.56", price: 1.0, value: 1234.56 },
      { symbol: "LINK", balance: "50.5", price: 14.23, value: 718.62 },
      { symbol: "UNI", balance: "12.34", price: 7.89, value: 97.36 }
    ],
    nfts: [
      { id: "1", collection: "Bored Ape", name: "BAYC #1234", image: "https://via.placeholder.com/150" },
      { id: "2", collection: "CryptoPunks", name: "Punk #5678", image: "https://via.placeholder.com/150" }
    ],
    transactions: [
      { hash: "0x123...abc", type: "transfer", value: "0.5 ETH", time: "2h ago", status: "confirmed" },
      { hash: "0x456...def", type: "swap", value: "100 USDT → 0.05 ETH", time: "1d ago", status: "confirmed" }
    ]
  };
};

export function useWallet(address: string | undefined) {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const walletData = await fetchWalletData(address);
        setData(walletData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [address]);

  return { data, isLoading, error };
}
