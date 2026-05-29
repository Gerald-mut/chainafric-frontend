import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function useWalletConnection() {
  const { address, isConnected, chain } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  
  const { data: balanceData } = useBalance({
    address,
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle wallet connection
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      connect({ connector: injected() });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle wallet disconnection
  const disconnectWallet = () => {
    disconnect();
  };

  return {
    address,
    isConnected,
    isLoading,
    connectWallet,
    disconnectWallet,
    balance: balanceData?.formatted,
    balanceSymbol: balanceData?.symbol,
    chainId: chain?.id,
    chainName: chain?.name,
  };
}
