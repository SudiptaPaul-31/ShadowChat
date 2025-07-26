// components/WalletErrorBoundary.tsx
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

interface WalletErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface WalletErrorBoundaryProps {
  children: React.ReactNode;
}

class WalletErrorBoundary extends React.Component<
  WalletErrorBoundaryProps,
  WalletErrorBoundaryState
> {
  constructor(props: WalletErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): WalletErrorBoundaryState {
    // Check if it's a wallet-related error
    const isWalletError = 
      error.message?.includes('toLowerCase') ||
      error.message?.includes('WalletAccount') ||
      error.message?.includes('Account') ||
      error.stack?.includes('starknet');

    return {
      hasError: !!isWalletError,
      error: isWalletError ? error : undefined,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log wallet-related errors
    if (this.state.hasError) {
      console.error('Wallet Error:', error);
      console.error('Error Info:', errorInfo);
      
      // Clear any potentially corrupted wallet data
      try {
        localStorage.removeItem('wallet_connection');
      } catch (e) {
        console.error('Failed to clear wallet connection:', e);
      }
    }
  }

  handleRetry = () => {
    // Clear the error state and try to reload
    this.setState({ hasError: false, error: undefined });
    
    // Clear localStorage wallet data
    try {
      localStorage.removeItem('wallet_connection');
    } catch (e) {
      console.error('Failed to clear wallet connection:', e);
    }
    
    // Optionally reload the page for a fresh start
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-6 max-w-md mx-auto p-6">
            <div className="text-6xl">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600">
              Wallet Connection Error
            </h2>
            <p className="text-muted-foreground">
              There was an issue connecting to your wallet. This might be due to:
            </p>
            <ul className="text-sm text-muted-foreground text-left space-y-1">
              <li>• Wallet extension not properly installed</li>
              <li>• Network connectivity issues</li>
              <li>• Corrupted wallet data</li>
              <li>• Browser compatibility issues</li>
            </ul>
            <div className="space-y-3">
              <Button 
                onClick={this.handleRetry}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
              >
                Clear Data & Retry
              </Button>
              <p className="text-xs text-muted-foreground">
                This will clear your wallet connection data and refresh the page
              </p>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left">
                <summary className="text-sm text-muted-foreground cursor-pointer">
                  Show error details (Development)
                </summary>
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 overflow-auto">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { WalletErrorBoundary };