
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import ConnectWallet from "@/components/ConnectWallet";
import WalletDetails from "@/components/WalletDetails";
import { Wallet } from "lucide-react";
import { useTranslation } from "@/utils/i18n";

const DashboardPage = () => {
  const { isConnected } = useWalletConnection();
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{t('yourDashboard')}</h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('connectToTrack')}
            </p>
            
            {!isConnected ? (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>{t('connectYourWallet')}</CardTitle>
                  <CardDescription>
                    {t('connectWeb3Wallet')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12">
                    <Wallet className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-center mb-6 max-w-md text-muted-foreground">
                      {t('connectToViewTokens')}
                    </p>
                    <ConnectWallet />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>{t('walletConnected')}</CardTitle>
                    <CardDescription>
                      <WalletDetails />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <span className="text-muted-foreground">{t('totalBalance')}</span>
                      <span className="font-bold">$2,345.67</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>ETH</span>
                        <span className="font-mono">0.68 ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span>MATIC</span>
                        <span className="font-mono">145.3 MATIC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>BNB</span>
                        <span className="font-mono">2.1 BNB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>{t('recentTransactionsTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex justify-between pb-2 border-b border-muted last:border-0">
                            <div>
                              <div className="font-medium">Transfer</div>
                              <div className="text-xs text-muted-foreground">2h ago</div>
                            </div>
                            <div className="text-right">
                              <div>0.25 ETH</div>
                              <div className="text-xs text-muted-foreground">0x742...f1d</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>{t('nftCollection')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="aspect-square bg-muted rounded-md"></div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
