
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useTranslation } from "@/utils/i18n";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    
    if (query.length === 66 && query.startsWith('0x')) {
      navigate(`/tx/${query}`);
    } else {
      navigate(`/address/${query}`);
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-gradient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          {t('heroTitle')} <span className="gradient-text">{t('heroTitleHighlight')}</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('heroSubtitle')}
        </p>

        <motion.form 
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="block w-full pl-10 pr-4 py-3 border border-muted bg-muted/50 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-sm md:text-base"
            />
          </div>
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg"
          >
            {t('search')}
          </Button>
        </motion.form>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="w-full max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <FeatureCard
          title="Multi-Chain Support"
          description="Track assets across Ethereum, BNB Chain, Polygon, Base, Solana and more."
          delay={0.5}
        />
        <FeatureCard
          title="Native Languages"
          description="Experience blockchain in Swahili, Zulu, Yoruba, Igbo, Hausa, and other African languages."
          delay={0.6}
        />
        <FeatureCard
          title="AI-Powered Insights"
          description="Get simplified explanations of complex blockchain activities in terms you understand."
          delay={0.7}
        />
      </motion.div>

      <motion.div 
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-primary hover:text-primary hover:bg-primary/10"
          onClick={() => navigate("/explore")}
        >
          <span>{t('exploreFeatures')}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

const FeatureCard = ({ title, description, delay }: { title: string; description: string; delay: number }) => (
  <motion.div 
    className="glass-card rounded-xl p-6 card-hover"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
  >
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

export default HeroSection;
