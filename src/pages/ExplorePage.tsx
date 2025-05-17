
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const ExplorePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">Explore Blockchain Data</h1>
            <p className="text-xl text-muted-foreground">
              Discover insights across multiple chains in a language that makes sense to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Multi-Chain Analytics"
              description="Track assets and transactions across Ethereum, BNB Chain, Polygon, and more — all in one place."
              link="/chains"
              delay={0.1}
            />
            
            <FeatureCard
              title="Wallet Portfolio"
              description="View token balances, NFTs, transaction history, and cross-chain activity for any wallet address."
              link="/dashboard"
              delay={0.2}
            />
            
            <FeatureCard
              title="Language Accessibility"
              description="Access blockchain data in major African languages, making Web3 accessible to everyone."
              link="/languages"
              delay={0.3}
            />
            
            <FeatureCard
              title="Contract Analysis"
              description="AI-powered contract auditing and summarization to understand potential risks and opportunities."
              link="/contracts"
              delay={0.4}
            />
            
            <FeatureCard
              title="NFT Gallery"
              description="Explore NFT collections with detailed metadata and transaction history across marketplaces."
              link="/nfts"
              delay={0.5}
            />
            
            <FeatureCard
              title="Airdrop Tracking"
              description="Never miss an airdrop with notifications and tracking for eligible wallets."
              link="/airdrops"
              delay={0.6}
            />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

const FeatureCard = ({ 
  title, 
  description, 
  link, 
  delay 
}: { 
  title: string; 
  description: string;
  link: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <Card className="glass-card h-full card-hover">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Button variant="ghost" size="sm" className="text-primary">
          <span>Learn more</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

export default ExplorePage;
