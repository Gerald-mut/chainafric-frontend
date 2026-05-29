import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { fetchTransactionData } from "@/services/blockchain";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, ArrowDownRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useTranslation } from "@/utils/i18n";

const TransactionPage = () => {
  const { txHash } = useParams<{ txHash: string }>();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const loadTransactionData = async () => {
      try {
        if (!txHash) return;
        setLoading(true);
        const data = await fetchTransactionData(txHash);
        setTransaction(data);
      } catch (err) {
        setError(t('failedLoadTx'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactionData();
  }, [txHash, t]);

  const renderStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t('transactionDetails')}</h1>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span className="font-mono break-all">{txHash}</span>
            </div>
          </div>

          {error ? (
            <Card className="w-full glass-card">
              <CardHeader>
                <CardTitle>{t('error')}</CardTitle>
                <CardDescription>{t('failedLoadTx')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          ) : loading ? (
            <TransactionSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-6">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{t('transactionOverview')}</CardTitle>
                    <CardDescription>{t('keyTxInfo')}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStatusIcon(transaction.status)}
                    <span className={`text-sm font-medium capitalize ${
                      transaction.status.toLowerCase() === "success" 
                        ? "text-green-500" 
                        : transaction.status.toLowerCase() === "pending" 
                          ? "text-amber-500" 
                          : "text-red-500"
                    }`}>{transaction.status}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground">{t('txHash')}</div>
                        <div className="font-mono text-sm break-all">{transaction.hash}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{t('block')}</div>
                        <div>{transaction.blockNumber}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{t('timestamp')}</div>
                        <div>{transaction.timestamp}</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground">{t('from')}</div>
                        <div className="font-mono text-sm break-all">{transaction.from}</div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="mt-1">
                          {transaction.direction === "outgoing" ? (
                            <ArrowUpRight className="h-4 w-4 text-red-500" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">{t('to')}</div>
                          <div className="font-mono text-sm break-all">{transaction.to}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-muted">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">{t('value')}</div>
                        <div className="text-lg font-semibold">{transaction.value} {transaction.symbol}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{t('transactionFee')}</div>
                        <div>{transaction.fee} {transaction.nativeSymbol}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{t('gasPrice')}</div>
                        <div>{transaction.gasPrice} Gwei</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {transaction.contractInteraction && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>{t('contractInteraction')}</CardTitle>
                    <CardDescription>{t('contractMethodCalled')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">{t('contract')}</div>
                      <div className="font-mono text-sm break-all">{transaction.contractAddress}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{t('function')}</div>
                      <div className="font-mono bg-muted p-2 rounded-md text-sm">{transaction.method}</div>
                    </div>
                    {transaction.arguments && (
                      <div>
                        <div className="text-sm text-muted-foreground">{t('arguments')}</div>
                        <pre className="bg-muted p-2 rounded-md text-xs overflow-x-auto">
                          {JSON.stringify(transaction.arguments, null, 2)}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {transaction.logs && transaction.logs.length > 0 && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>{t('eventLogs')}</CardTitle>
                    <CardDescription>{t('eventsEmitted')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transaction.logs.map((log: any, index: number) => (
                        <div key={index} className="p-3 bg-muted rounded-md">
                          <div className="font-medium mb-1">{log.event}</div>
                          <div className="text-sm text-muted-foreground">{t('fromContract')}: {log.address}</div>
                          <pre className="mt-2 text-xs overflow-x-auto">
                            {JSON.stringify(log.data, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

const TransactionSkeleton = () => (
  <div className="grid grid-cols-1 gap-6">
    <Card className="glass-card">
      <CardHeader>
        <div className="flex justify-between">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-6 w-20" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        <div className="pt-4 border-t border-muted">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
    <Skeleton className="h-64 w-full" />
  </div>
);

export default TransactionPage;
