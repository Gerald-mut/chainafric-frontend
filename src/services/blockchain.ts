
// Mock data for demonstration - in a real app you would use a blockchain API
const mockTransactions = {
  "0x123456789abcdef": {
    hash: "0x123456789abcdef",
    blockNumber: 14356789,
    timestamp: "2023-10-15 14:23:18",
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    direction: "outgoing",
    value: "0.5",
    symbol: "ETH",
    nativeSymbol: "ETH",
    fee: "0.002134",
    gasPrice: "15",
    status: "success",
    contractInteraction: true,
    contractAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    method: "transfer(address _to, uint256 _value)",
    arguments: {
      _to: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
      _value: "500000000000000000"
    },
    logs: [
      {
        event: "Transfer",
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        data: {
          from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          to: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
          value: "0.5"
        }
      }
    ]
  },
  "0xabcdef123456789": {
    hash: "0xabcdef123456789",
    blockNumber: 14356790,
    timestamp: "2023-10-15 14:25:42",
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    direction: "outgoing",
    value: "0",
    symbol: "ETH",
    nativeSymbol: "ETH",
    fee: "0.005672",
    gasPrice: "18",
    status: "success",
    contractInteraction: true,
    contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    method: "swapExactETHForTokens(uint amountOutMin, address[] path, address to, uint deadline)",
    arguments: {
      amountOutMin: "4500000000",
      path: ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"],
      to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      deadline: "1634310342"
    },
    logs: [
      {
        event: "Swap",
        address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        data: {
          sender: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          amount0In: "0.3",
          amount1In: "0",
          amount0Out: "0",
          amount1Out: "45.23"
        }
      }
    ]
  }
};

// Function to fetch wallet data - Replace with real API calls in production
export const fetchWalletData = async (address: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    address,
    ens: address === "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" ? "afritracker.eth" : null,
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
      { id: "1", collection: "Bored Ape", name: "BAYC #1234", image: "https://images.unsplash.com/photo-1578353022142-09360f53d6b4?q=80&w=300" },
      { id: "2", collection: "CryptoPunks", name: "Punk #5678", image: "https://images.unsplash.com/photo-1616077168627-cc3c436b9c35?q=80&w=300" }
    ],
    transactions: [
      { hash: "0x123456789abcdef", type: "transfer", value: "0.5 ETH", time: "2h ago", status: "confirmed" },
      { hash: "0xabcdef123456789", type: "swap", value: "0.3 ETH → 45.23 UNI", time: "2h ago", status: "confirmed" }
    ]
  };
};

// Function to fetch transaction data - Replace with real API calls in production
export const fetchTransactionData = async (txHash: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data based on txHash
  const transaction = mockTransactions[txHash as keyof typeof mockTransactions];
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  
  return transaction;
};
