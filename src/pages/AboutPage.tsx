
import React from "react";
import { Globe, Shield, TrendingUp, Users, Flag, Info } from "lucide-react";
import Layout from "@/components/Layout";

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center gradient-text">About Us</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl mb-8">
            Welcome to AfriTrack — your all-seeing dashboard for digital ownership in the Ethereum universe.
          </p>
          
          <p className="mb-8">
            AfriTrack is a multi-standard asset tracking system designed to give you complete visibility across the blockchain. 
            Whether it's ERC-20 tokens, NFTs, or DeFi positions across L1s and L2s, AfriTrack consolidates your holdings 
            into one seamless interface — no more hopping between wallets, explorers, or chains.
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Flag className="mr-2 h-6 w-6" />
              Our Mission
            </h2>
            <p>
              To make crypto ownership transparent, accessible, and understandable — no matter how complex your on-chain footprint is.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-6 w-6" />
              What We Do
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Globe className="h-6 w-6 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Unified Wallet View:</strong> Track everything you own across Ethereum, Layer 2s, and EVM-compatible chains.</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-6 w-6 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Multi-Standard Support:</strong> ERC-20s, ERC-721s, ERC-1155s — you name it, we show it.</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="h-6 w-6 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Real-Time Market Feeds:</strong> Get the latest crypto news and financial updates alongside your portfolio.</span>
              </li>
              <li className="flex items-start">
                <Users className="h-6 w-6 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Address Intelligence:</strong> Connect multiple addresses and gain insights into your full digital portfolio.</span>
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Shield className="mr-2 h-6 w-6" />
              Why AfriTrack?
            </h2>
            <p>
              Because ownership in crypto is borderless — but visibility shouldn't be a guessing game. 
              Whether you're a DeFi degen, a DAO contributor, or just managing multiple wallets, 
              AfriTrack gives you the clarity and control you deserve.
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Globe className="mr-2 h-6 w-6" />
              Built for the Next Billion
            </h2>
            <p>
              AfriTrack is proudly built with Africa in mind — a continent rapidly embracing digital finance. 
              We're building tools that are future-forward, inclusive, and ready for global scale.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
