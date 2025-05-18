
import React from 'react';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const WalletDetails = () => {
  const { address, disconnectWallet, balance, balanceSymbol, chainName } = useWalletConnection();
  
  const truncateAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Connected Address</span>
        <span className="font-mono font-medium">{truncateAddress(address)}</span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Network</span>
        <span className="font-medium">{chainName || 'Unknown'}</span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">Balance</span>
        <span className="font-medium">{balance} {balanceSymbol}</span>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleDisconnect}
        className="ml-auto"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Disconnect
      </Button>
    </div>
  );
};

export default WalletDetails;
