"use client";

import { StarknetConfig, publicProvider } from "@starknet-react/core";
import { sepolia } from "@starknet-react/chains";

export default function StarknetProvider({ children }: { children: React.ReactNode }) {
  return (
    <StarknetConfig chains={[sepolia]} provider={publicProvider()}>
      {children}
    </StarknetConfig>
  );
}
