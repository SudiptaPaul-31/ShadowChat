// components/WalletLoader.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useWalletContext } from '@/context/WalletContext';
import { useAccount } from '@starknet-react/core';

interface WalletLoaderProps {
  children: React.ReactNode;
}

const WalletLoader = ({ children }: WalletLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { restoreConnection } = useWalletContext();
  const { address } = useAccount();

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        setError(null);
        await restoreConnection();
      } catch (error: any) {
        console.error('Failed to restore wallet connection:', error);
        setError(error?.message || 'Failed to initialize wallet connection');
        
        // Clear potentially corrupted data
        try {
          localStorage.removeItem('wallet_connection');
        } catch (e) {
          console.error('Failed to clear wallet connection:', e);
        }
      } finally {
        // Give a small delay to ensure everything is initialized
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    initializeWallet();
  }, [restoreConnection]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-muted-foreground">Initializing wallet connection...</p>
          {error && (
            <p className="text-red-500 text-sm max-w-md">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export { WalletLoader };