
import React from "react";
import { Globe, Shield, TrendingUp, Users, Flag, Info } from "lucide-react";
import Layout from "@/components/Layout";
import { useTranslation } from "@/utils/i18n";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center gradient-text">{t('aboutUs')}</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl mb-8">
            {t('welcomeText')}
          </p>
          
          <p className="mb-8">
            {t('descriptionText')}
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Flag className="mr-2 h-6 w-6" />
              {t('ourMission')}
            </h2>
            <p>
              {t('missionText')}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-6 w-6" />
              {t('whatWeDo')}
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Globe className="h-6 w-6 mr-2 mt-1 flex-shrink-0" />
                <span><strong>{t('unifiedWalletTitle')}:</strong> {t('unifiedWalletDesc')}</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-6 w-6 mr-2 mt-1 flex-shrink-0" />
                <span><strong>{t('multiStandardTitle')}:</strong> {t('multiStandardDesc')}</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="h-6 w-6 mr-2 mt-1 flex-shrink-0" />
                <span><strong>{t('marketFeedsTitle')}:</strong> {t('marketFeedsDesc')}</span>
              </li>
              <li className="flex items-start">
                <Users className="h-6 w-6 mr-2 mt-1 flex-shrink-0" />
                <span><strong>{t('addressIntelTitle')}:</strong> {t('addressIntelDesc')}</span>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Shield className="mr-2 h-6 w-6" />
              {t('whyAfriTrack')}
            </h2>
            <p>
              {t('whyText')}
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Globe className="mr-2 h-6 w-6" />
              {t('builtForNextBillion')}
            </h2>
            <p>
              {t('builtText')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
