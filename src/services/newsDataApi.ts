
import { toast } from "@/hooks/use-toast";

// Define the NewsData.io API response type
export interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: NewsItem[];
  nextPage?: string;
}

export interface NewsItem {
  article_id: string;
  title: string;
  link: string;
  keywords: string[];
  creator: string[];
  video_url: string | null;
  description: string;
  content: string;
  pubDate: string;
  image_url: string | null;
  source_id: string;
  source_priority: number;
  country: string[];
  category: string[];
  language: string;
}

// Transform NewsData.io response to our app's format
export interface AppNewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  imageUrl: string;
  url: string;
}

// Default image if none provided by the API
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800";

// NewsData.io API Key
// In production, this should be stored in a secure environment variable
const API_KEY = "YOUR_NEWSDATA_API_KEY"; // Replace with your actual API key

// Convert API date format to a friendly date
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return dateString;
  }
};

// Map category from NewsData to our app's categories
const mapCategory = (categories: string[]): string => {
  if (!categories || categories.length === 0) return "Learn";
  
  const categoryMap: Record<string, string> = {
    "business": "DeFi",
    "technology": "Learn",
    "entertainment": "NFTs",
    "science": "Learn",
    "crypto": "Learn",
    "blockchain": "Learn", 
    "nft": "NFTs",
    "defi": "DeFi",
    "security": "Security Alerts",
  };
  
  for (const category of categories) {
    const lowercaseCategory = category.toLowerCase();
    for (const [key, value] of Object.entries(categoryMap)) {
      if (lowercaseCategory.includes(key)) {
        return value;
      }
    }
  }
  
  return "Learn"; // Default category
};

// Fetch news from NewsData.io API
export const fetchNewsFromApi = async (category: string = "all"): Promise<AppNewsItem[]> => {
  try {
    // Map our app categories to NewsData.io query parameters
    const categoryQueries: Record<string, string> = {
      all: "crypto OR blockchain OR bitcoin OR ethereum",
      nfts: "nft OR \"non-fungible token\" OR \"digital art\"",
      defi: "defi OR \"decentralized finance\" OR cryptocurrency",
      scams: "crypto scam OR blockchain security OR hack",
      beginner: "crypto beginner OR \"blockchain explained\" OR \"crypto guide\"",
    };
    
    const query = categoryQueries[category as keyof typeof categoryQueries] || categoryQueries.all;
    
    const url = new URL("https://newsdata.io/api/1/news");
    url.searchParams.append("apikey", API_KEY);
    url.searchParams.append("q", query);
    url.searchParams.append("language", "en");
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }
    
    const data: NewsDataResponse = await response.json();
    
    if (data.status !== "success") {
      throw new Error(`API returned error: ${data.status}`);
    }
    
    return data.results.map(item => ({
      id: item.article_id,
      title: item.title,
      summary: item.description || "",
      category: mapCategory(item.category),
      date: formatDate(item.pubDate),
      imageUrl: item.image_url || DEFAULT_IMAGE,
      url: item.link,
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    toast({
      title: "Error fetching news",
      description: "Could not load the latest news. Please try again later.",
      variant: "destructive",
    });
    return [];
  }
};
