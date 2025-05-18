
import React, { ReactNode } from "react";
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { mainnet, optimism, arbitrum, base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

// Configure chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, optimism, arbitrum, base],
  [publicProvider()]
);

// Set up connectors
const connectors = [
  new InjectedConnector({ chains }),
  new MetaMaskConnector({ chains }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: "AfriTracker",
    },
  }),
];

// Create wagmi config
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
