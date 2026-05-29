
import React, { ReactNode } from "react";
import { createConfig, WagmiProvider, http } from "wagmi";
import { mainnet, optimism, arbitrum, base } from "wagmi/chains";
import { injected, metaMask, coinbaseWallet } from "wagmi/connectors";

// Create wagmi config
const config = createConfig({
  chains: [mainnet, optimism, arbitrum, base],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ appName: "AfriTracker" }),
  ],
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
});

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
