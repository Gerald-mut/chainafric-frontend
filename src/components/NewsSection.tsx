
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ExternalLink } from "lucide-react";
import { fetchNews } from "@/services/news";
import { AppNewsItem } from "@/services/newsDataApi";
import { toast } from "@/hooks/use-toast";

const categories = [
  { id: "all", label: "All" },
  { id: "nfts", label: "NFTs" },
  { id: "defi", label: "DeFi" },
  { id: "scams", label: "Security Alerts" },
  { id: "beginner", label: "Learn" },
];

const NewsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [news, setNews] = useState<AppNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const newsData = await fetchNews(selectedCategory);
        setNews(newsData);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        toast({
          title: "Error loading news",
          description: "We couldn't load the latest news. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [selectedCategory]);

  return (
    <motion.section
      id="news"
      className="py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">News & Education</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Stay informed on the latest blockchain trends, security alerts, and educational content
          </p>
        </div>
        
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="mb-8 flex flex-wrap justify-center">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="px-4 py-2">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <NewsCardSkeleton key={i} />
                ))
              ) : news.length > 0 ? (
                news.map((item, index) => (
                  <NewsCard key={item.id || index} article={item} delay={index * 0.1} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No news found for this category. Please try another category.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            View all articles 
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

const NewsCard = ({ article, delay }: { article: AppNewsItem, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <Card className="glass-card h-full overflow-hidden card-hover">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800";
          }}
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-muted-foreground">{article.date}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{article.category}</span>
        </div>
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        <CardDescription className="line-clamp-2">{article.summary}</CardDescription>
      </CardHeader>
      <CardFooter>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button variant="ghost" className="group mt-auto w-full justify-start p-0 hover:bg-transparent">
            Read more
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  </motion.div>
);

const NewsCardSkeleton = () => (
  <Card className="glass-card h-full overflow-hidden">
    <Skeleton className="aspect-video w-full" />
    <CardHeader>
      <div className="flex justify-between items-center mb-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </CardHeader>
    <CardFooter>
      <Skeleton className="h-8 w-28" />
    </CardFooter>
  </Card>
);

export default NewsSection;
