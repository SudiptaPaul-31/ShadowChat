// context/WalletContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAccount, useDisconnect, useConnect } from '@starknet-react/core';
import { argent, braavos } from '@starknet-react/core';

interface WalletContextType {
  isConnected: boolean;
  address: string | undefined;
  connectorName: string | null;
  setWalletConnected: (connected: boolean) => void;
  persistConnection: () => void;
  clearPersistedConnection: () => void;
  restoreConnection: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectorName, setConnectorName] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  // Use localStorage instead of sessionStorage for persistent connection
  const persistConnection = useCallback(() => {
    if (address && connector && connector.id) {
      try {
        localStorage.setItem('wallet_connection', JSON.stringify({
          connected: true,
          connectorId: connector.id,
          address: address,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.error('Failed to persist connection:', error);
      }
    }
  }, [address, connector]);

  const clearPersistedConnection = useCallback(() => {
    localStorage.removeItem('wallet_connection');
  }, []);

  const setWalletConnected = useCallback((connected: boolean) => {
    setIsConnected(connected);
    if (!connected) {
      setConnectorName(null);
      clearPersistedConnection();
      disconnect();
    }
  }, [disconnect, clearPersistedConnection]);

  // Restore connection function
  const restoreConnection = useCallback(async () => {
    const savedConnection = localStorage.getItem('wallet_connection');
    if (savedConnection) {
      try {
        const { connected, connectorId, timestamp } = JSON.parse(savedConnection);
        
        // Check if the saved connection is not too old (optional: 24 hours)
        const isConnectionValid = Date.now() - timestamp < 24 * 60 * 60 * 1000;
        
        if (connected && isConnectionValid && !address) {
          // Validate connectorId before attempting connection
          if (connectorId && (connectorId === 'argent' || connectorId === 'braavos')) {
            try {
              const connectorToUse = connectorId === 'argent' ? argent() : braavos();
              
              // Check if connector is available before connecting
              if (connectorToUse) {
                await connect({ connector: connectorToUse });
              } else {
                console.warn(`Connector ${connectorId} not available`);
                clearPersistedConnection();
              }
            } catch (error) {
              console.error('Failed to restore connection:', error);
              clearPersistedConnection();
            }
          } else {
            console.warn('Invalid connector ID in saved connection');
            clearPersistedConnection();
          }
        } else if (!isConnectionValid) {
          // Clear old connection data
          clearPersistedConnection();
        }
      } catch (error) {
        console.error('Error parsing saved connection:', error);
        localStorage.removeItem('wallet_connection');
      }
    }
    setIsInitialized(true);
  }, [address, connect, clearPersistedConnection]);

  // Initialize and restore connection on mount
  useEffect(() => {
    if (!isInitialized) {
      restoreConnection();
    }
  }, [restoreConnection, isInitialized]);

  // Update connection state when account changes
  useEffect(() => {
    if (address && connector && connector.id) {
      setIsConnected(true);
      setConnectorName(connector.id);
      persistConnection();
    } else if (!address && isConnected && isInitialized) {
      // Only clear if we were previously connected and it's not during initialization
      setIsConnected(false);
      setConnectorName(null);
      clearPersistedConnection();
    }
  }, [address, connector?.id, isConnected, isInitialized, persistConnection, clearPersistedConnection]);

  // Handle page refresh or navigation - check for existing connection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !address && isInitialized) {
        // Page became visible and no wallet connected, try to restore
        const savedConnection = localStorage.getItem('wallet_connection');
        if (savedConnection) {
          restoreConnection();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [address, isInitialized, restoreConnection]);

  const value: WalletContextType = {
    isConnected,
    address,
    connectorName,
    setWalletConnected,
    persistConnection,
    clearPersistedConnection,
    restoreConnection
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};