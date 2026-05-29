
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/utils/i18n";

const ExplorePage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">{t('exploreBlockchainData')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('discoverInsights')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title={t('multiChainAnalytics')}
              description={t('trackAssets')}
              link="/chains"
              delay={0.1}
              t={t}
            />
            
            <FeatureCard
              title={t('walletPortfolio')}
              description={t('viewTokenBalances')}
              link="/dashboard"
              delay={0.2}
              t={t}
            />
            
            <FeatureCard
              title={t('languageAccessibility')}
              description={t('accessBlockchain')}
              link="/languages"
              delay={0.3}
              t={t}
            />
            
            <FeatureCard
              title={t('contractAnalysis')}
              description={t('aiPoweredContract')}
              link="/contracts"
              delay={0.4}
              t={t}
            />
            
            <FeatureCard
              title={t('nftGalleryTitle')}
              description={t('exploreNftCollections')}
              link="/nfts"
              delay={0.5}
              t={t}
            />
            
            <FeatureCard
              title={t('airdropTracking')}
              description={t('neverMissAirdrop')}
              link="/airdrops"
              delay={0.6}
              t={t}
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
  delay,
  t
}: { 
  title: string; 
  description: string;
  link: string;
  delay: number;
  t: any;
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
          <span>{t('learnMore')}</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

export default ExplorePage;
