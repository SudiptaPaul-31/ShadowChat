// providers/StarknetProvider.tsx
"use client";

import { StarknetConfig, publicProvider } from "@starknet-react/core";
import { sepolia } from "@starknet-react/chains";
import { WalletProvider } from "@/context/WalletContext";
import { WalletLoader } from "@/components/WalletLoader";
import { WalletErrorBoundary } from "@/components/WalletErrorBoundary";

export default function StarknetProvider({ children }: { children: React.ReactNode }) {
  return (
    <WalletErrorBoundary>
      <StarknetConfig chains={[sepolia]} provider={publicProvider()}>
        <WalletProvider>
          <WalletLoader>
            {children}
          </WalletLoader>
        </WalletProvider>
      </StarknetConfig>
    </WalletErrorBoundary>
  );
}