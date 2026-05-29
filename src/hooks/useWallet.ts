import { useState, useEffect } from 'react';
import { fetchWalletData } from '../services/blockchain';

export function useWallet(address: string | undefined) {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const walletData = await fetchWalletData(address);
        setData(walletData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [address]);

  return { data, isLoading, error };
}
