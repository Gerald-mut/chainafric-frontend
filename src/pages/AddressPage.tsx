
import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, Wallet, Image, History } from "lucide-react";

const AddressPage = () => {
  const { address } = useParams<{ address: string }>();
  const { data, isLoading, error } = useWallet(address);
  const [activeTab, setActiveTab] = useState("overview");

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="w-full max-w-md glass-card">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load wallet data</CardDescription>
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
          <h1 className="text-3xl font-bold mb-2">Wallet Details</h1>
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
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <OverviewCard isLoading={isLoading} data={data} />
                
                {/* Recent Activity Card */}
                <ActivityCard isLoading={isLoading} data={data} />
                
                {/* NFT Preview Card */}
                <NFTPreviewCard isLoading={isLoading} data={data} />
              </div>
            </TabsContent>

            <TabsContent value="tokens">
              <TokensTab isLoading={isLoading} data={data} />
            </TabsContent>

            <TabsContent value="nfts">
              <NFTsTab isLoading={isLoading} data={data} />
            </TabsContent>

            <TabsContent value="transactions">
              <TransactionsTab isLoading={isLoading} data={data} />
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
};

const OverviewCard = ({ isLoading, data }: { isLoading: boolean; data: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>Balance</CardTitle>
      <CardDescription>Across multiple chains</CardDescription>
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
          <div className="text-sm text-muted-foreground">Total Value</div>
          <div className="text-3xl font-bold">$2,050.54</div>
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

const ActivityCard = ({ isLoading, data }: { isLoading: boolean; data: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
      <CardDescription>Latest blockchain transactions</CardDescription>
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

const NFTPreviewCard = ({ isLoading, data }: { isLoading: boolean; data: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>NFTs</CardTitle>
      <CardDescription>Digital collectibles</CardDescription>
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

const TokensTab = ({ isLoading, data }: { isLoading: boolean; data: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>Token Holdings</CardTitle>
      <CardDescription>ERC-20 tokens across chains</CardDescription>
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
            <div>Token</div>
            <div className="text-right">Balance</div>
            <div className="text-right">Value (USD)</div>
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

const NFTsTab = ({ isLoading, data }: { isLoading: boolean; data: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>NFT Collection</CardTitle>
      <CardDescription>ERC-721 and ERC-1155 tokens</CardDescription>
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

const TransactionsTab = ({ isLoading, data }: { isLoading: boolean; data: any }) => (
  <Card className="glass-card">
    <CardHeader>
      <CardTitle>Transaction History</CardTitle>
      <CardDescription>Recent on-chain activity</CardDescription>
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
            <div>Transaction</div>
            <div>Type</div>
            <div>Value</div>
            <div className="text-right">Time</div>
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
