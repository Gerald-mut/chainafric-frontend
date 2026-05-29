import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, Wallet, Image, History } from "lucide-react";
import { useTranslation } from "@/utils/i18n";

const AddressPage = () => {
  const { address } = useParams<{ address: string }>();
  const { data, isLoading, error } = useWallet(address);
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useTranslation();

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="w-full max-w-md glass-card">
          <CardHeader>
            <CardTitle>{t('error')}</CardTitle>
            <CardDescription>{t('failedLoadWallet')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('walletDetails')}</h1>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Wallet className="h-4 w-4" />
            <span className="font-mono">{address}</span>
            {data?.ens && (
              <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                {data.ens}
              </span>
            )}
          </div>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="bg-afri-dark border border-muted grid grid-cols-3 md:grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="overview">{t('overview')}</TabsTrigger>
            <TabsTrigger value="tokens">{t('tokens')}</TabsTrigger>
            <TabsTrigger value="nfts">{t('nfts')}</TabsTrigger>
            <TabsTrigger value="transactions">{t('transactions')}</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <OverviewCard isLoading={isLoading} data={data} t={t} />
                
                {/* Recent Activity Card */}
                <ActivityCard isLoading={isLoading} data={data} t={t} />
                
                {/* NFT Preview Card */}
                <NFTPreviewCard isLoading={isLoading} data={data} t={t} />
              </div>
            </TabsContent>

            <TabsContent value="tokens">
              <TokensTab isLoading={isLoading} data={data} t={t} />
            </TabsContent>

            <TabsContent value="nfts">
              <NFTsTab isLoading={isLoading} data={data} t={t} />
            </TabsContent>

            <TabsContent value="transactions">
              <TransactionsTab isLoading={isLoading} data={data} t={t} />
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
};

const OverviewCard = ({ isLoading, data, t }: { isLoading: boolean; data: any; t: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>{t('balance')}</CardTitle>
      <CardDescription>{t('acrossChains')}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {isLoading ? (
        <>
          <Skeleton className="h-4 w-28 bg-muted" />
          <Skeleton className="h-8 w-36 bg-muted" />
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-2/3 bg-muted" />
          </div>
        </>
      ) : (
        <>
          <div className="text-sm text-muted-foreground">{t('mainnetEthBalance')}</div>
          <div className="text-3xl font-bold">{data?.balance?.eth ? `${data.balance.eth} ETH` : '0.00 ETH'}</div>
          <div className="space-y-2 mt-4">
            {data?.balance && Object.entries(data.balance).map(([chain, amount]: [string, any]) => (
              <div key={chain} className="flex justify-between">
                <span className="capitalize">{chain}</span>
                <span className="font-mono">{amount}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </CardContent>
  </Card>
);

const ActivityCard = ({ isLoading, data, t }: { isLoading: boolean; data: any; t: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>{t('recentActivity')}</CardTitle>
      <CardDescription>{t('latestTransactions')}</CardDescription>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full bg-muted" />
          <Skeleton className="h-12 w-full bg-muted" />
        </div>
      ) : (
        <div className="space-y-4">
          {data?.transactions?.slice(0, 2).map((tx: any, i: number) => (
            <div key={i} className="flex items-start justify-between text-sm">
              <div>
                <div className="font-medium">{tx.type}</div>
                <div className="text-muted-foreground">{tx.time}</div>
              </div>
              <div className="text-right">
                <div className="font-mono">{tx.value}</div>
                <div className="text-xs text-muted-foreground">
                  {tx.hash.substring(0, 6)}...{tx.hash.substring(tx.hash.length - 4)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

const NFTPreviewCard = ({ isLoading, data, t }: { isLoading: boolean; data: any; t: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>{t('nfts')}</CardTitle>
      <CardDescription>{t('digitalCollectibles')}</CardDescription>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="aspect-square bg-muted" />
          <Skeleton className="aspect-square bg-muted" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {data?.nfts?.slice(0, 2).map((nft: any) => (
            <div key={nft.id} className="relative group">
              <img 
                src={nft.image} 
                alt={nft.name} 
                className="w-full rounded-md aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <div className="text-xs text-center">
                  <div className="font-medium">{nft.name}</div>
                  <div className="text-gray-400">{nft.collection}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

const TokensTab = ({ isLoading, data, t }: { isLoading: boolean; data: any; t: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>{t('tokenHoldings')}</CardTitle>
      <CardDescription>{t('erc20Tokens')}</CardDescription>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-16 w-full bg-muted" />
          <Skeleton className="h-16 w-full bg-muted" />
          <Skeleton className="h-16 w-full bg-muted" />
        </div>
      ) : (
        <div className="space-y-1">
          <div className="grid grid-cols-3 text-xs text-muted-foreground py-2 border-b border-muted">
            <div>{t('token')}</div>
            <div className="text-right">{t('balance')}</div>
            <div className="text-right">{t('valueUsd')}</div>
          </div>
          {data?.tokens?.map((token: any, i: number) => (
            <div key={i} className="grid grid-cols-3 py-3 border-b border-muted last:border-0">
              <div className="font-medium">{token.symbol}</div>
              <div className="text-right font-mono">{token.balance}</div>
              <div className="text-right">${token.value.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

const NFTsTab = ({ isLoading, data, t }: { isLoading: boolean; data: any; t: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>{t('nftCollection')}</CardTitle>
      <CardDescription>{t('erc721Tokens')}</CardDescription>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="aspect-square bg-muted" />
          <Skeleton className="aspect-square bg-muted" />
          <Skeleton className="aspect-square bg-muted" />
          <Skeleton className="aspect-square bg-muted" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.nfts?.map((nft: any) => (
            <div key={nft.id} className="glass-card rounded-lg overflow-hidden group">
              <div className="relative aspect-square">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                  <span className="text-sm font-medium">{nft.name}</span>
                  <span className="text-xs text-gray-300">{nft.collection}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

const TransactionsTab = ({ isLoading, data, t }: { isLoading: boolean; data: any; t: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>{t('transactionHistory')}</CardTitle>
      <CardDescription>{t('recentOnChain')}</CardDescription>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-16 w-full bg-muted" />
          <Skeleton className="h-16 w-full bg-muted" />
          <Skeleton className="h-16 w-full bg-muted" />
        </div>
      ) : (
        <div className="space-y-1">
          <div className="grid grid-cols-4 text-xs text-muted-foreground py-2 border-b border-muted">
            <div>{t('transaction')}</div>
            <div>{t('type')}</div>
            <div>{t('value')}</div>
            <div className="text-right">{t('time')}</div>
          </div>
          {data?.transactions?.map((tx: any, i: number) => (
            <div key={i} className="grid grid-cols-4 py-3 border-b border-muted last:border-0">
              <div className="font-mono text-sm">
                {tx.hash.substring(0, 6)}...{tx.hash.substring(tx.hash.length - 4)}
              </div>
              <div className="capitalize">{tx.type}</div>
              <div>{tx.value}</div>
              <div className="text-right text-muted-foreground">{tx.time}</div>
            </div>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

export default AddressPage;
