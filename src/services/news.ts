
// Mock news data - Replace with real API calls in production
const mockNews = {
  all: [
    {
      id: "1",
      title: "Understanding the Rise of Layer 2 Solutions in Ethereum",
      summary: "Layer 2 scaling solutions are becoming increasingly important for Ethereum. Learn how they work and why they matter.",
      category: "Learn",
      date: "May 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800"
    },
    {
      id: "2",
      title: "New Phishing Scam Targets MetaMask Users",
      summary: "Security alert: A sophisticated phishing campaign is targeting MetaMask users. Learn how to protect yourself.",
      category: "Security Alerts",
      date: "May 14, 2025",
      imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800"
    },
    {
      id: "3",
      title: "Top NFT Collections to Watch in 2025",
      summary: "These emerging NFT collections are gaining traction and could be the next big thing in the digital art world.",
      category: "NFTs",
      date: "May 12, 2025",
      imageUrl: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=800"
    },
    {
      id: "4",
      title: "DeFi Yield Farming Strategies for Beginners",
      summary: "A beginner's guide to yield farming in DeFi - maximize your returns while understanding the risks.",
      category: "DeFi",
      date: "May 10, 2025",
      imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=800"
    },
    {
      id: "5",
      title: "How to Set Up Your First Crypto Wallet",
      summary: "A step-by-step guide for beginners on setting up and securing your first cryptocurrency wallet.",
      category: "Learn",
      date: "May 8, 2025",
      imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800"
    },
    {
      id: "6",
      title: "The Impact of Digital Currency on African Economies",
      summary: "Exploring how cryptocurrency adoption is transforming financial systems across African nations.",
      category: "Learn",
      date: "May 5, 2025",
      imageUrl: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=800"
    }
  ],
  nfts: [
    {
      id: "3",
      title: "Top NFT Collections to Watch in 2025",
      summary: "These emerging NFT collections are gaining traction and could be the next big thing in the digital art world.",
      category: "NFTs",
      date: "May 12, 2025",
      imageUrl: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=800"
    },
    {
      id: "7",
      title: "NFT Marketplaces Comparison: Where to Buy and Sell Digital Art",
      summary: "A comprehensive comparison of the most popular NFT marketplaces, their fees, and unique features.",
      category: "NFTs",
      date: "May 3, 2025",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"
    }
  ],
  defi: [
    {
      id: "4",
      title: "DeFi Yield Farming Strategies for Beginners",
      summary: "A beginner's guide to yield farming in DeFi - maximize your returns while understanding the risks.",
      category: "DeFi",
      date: "May 10, 2025",
      imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=800"
    },
    {
      id: "8",
      title: "The Rise of Decentralized Exchanges: DEXs Explained",
      summary: "Understanding how decentralized exchanges work and their advantages over traditional centralized platforms.",
      category: "DeFi",
      date: "May 1, 2025",
      imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=800"
    }
  ],
  scams: [
    {
      id: "2",
      title: "New Phishing Scam Targets MetaMask Users",
      summary: "Security alert: A sophisticated phishing campaign is targeting MetaMask users. Learn how to protect yourself.",
      category: "Security Alerts",
      date: "May 14, 2025",
      imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800"
    },
    {
      id: "9",
      title: "Common Smart Contract Vulnerabilities to Watch Out For",
      summary: "Learn about the most common security vulnerabilities in smart contracts and how to avoid them.",
      category: "Security Alerts",
      date: "April 28, 2025",
      imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=800"
    }
  ],
  beginner: [
    {
      id: "1",
      title: "Understanding the Rise of Layer 2 Solutions in Ethereum",
      summary: "Layer 2 scaling solutions are becoming increasingly important for Ethereum. Learn how they work and why they matter.",
      category: "Learn",
      date: "May 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800"
    },
    {
      id: "5",
      title: "How to Set Up Your First Crypto Wallet",
      summary: "A step-by-step guide for beginners on setting up and securing your first cryptocurrency wallet.",
      category: "Learn",
      date: "May 8, 2025",
      imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800"
    },
    {
      id: "6",
      title: "The Impact of Digital Currency on African Economies",
      summary: "Exploring how cryptocurrency adoption is transforming financial systems across African nations.",
      category: "Learn",
      date: "May 5, 2025",
      imageUrl: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=800"
    }
  ]
};

export const fetchNews = async (category: string = 'all') => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock data based on the selected category
  return mockNews[category as keyof typeof mockNews] || mockNews.all;
};
