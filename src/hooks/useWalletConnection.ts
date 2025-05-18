
import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance, useNetwork } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export function useWalletConnection() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { data: balanceData } = useBalance({
    address,
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle wallet connection
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      await connect();
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
