// components/WalletModal.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import {
  argent,
  braavos,
  useConnect,
  useDisconnect,
  useAccount,
} from "@starknet-react/core";
import { useWalletContext } from "@/context/WalletContext";

interface WalletModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletModal = ({ isOpen, onOpenChange }: WalletModalProps) => {
  const { toast, dismiss } = useToast();
  const router = useRouter();

  const { connect, isSuccess, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, connector } = useAccount();
  
  // Use global wallet context
  const { 
    isConnected, 
    setWalletConnected, 
    persistConnection, 
    clearPersistedConnection 
  } = useWalletContext();

  const [walletName, setWalletName] = useState("");
  const [hasProcessedSuccess, setHasProcessedSuccess] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (connector?.id) {
      setWalletName(connector.id);
    }
  }, [connector?.id]);

  // Handle success state - prevent infinite loops
  useEffect(() => {
    if (isSuccess && walletName && address && !hasProcessedSuccess) {
      setHasProcessedSuccess(true);
      setIsConnecting(false);
      toast.success(`Connected to ${walletName}!`);
      persistConnection(); // Persist the connection
      onOpenChange(false); // Close modal
      
      // Only navigate if not already on home page
      if (window.location.pathname !== "/") {
        router.push("/");
      }
    } else if (error && !hasProcessedSuccess) {
      setIsConnecting(false);
      toast.error("Connection aborted");
    }
  }, [isSuccess, walletName, address, error, hasProcessedSuccess, persistConnection, onOpenChange, router, toast]);

  // Reset processed state when modal opens
  useEffect(() => {
    if (isOpen) {
      setHasProcessedSuccess(false);
      setIsConnecting(false);
    }
  }, [isOpen]);

  const handleConnect = useCallback(async (wallet: "argent" | "braavos") => {
    if (isConnecting) return; // Prevent multiple connection attempts
    
    setIsConnecting(true);
    const toastId = toast.loading(`Connecting to ${wallet}...`);

    try {
      const connectorToUse = wallet === "argent" ? argent() : braavos();
      
      // Validate connector before attempting connection
      if (!connectorToUse) {
        throw new Error(`${wallet} connector not available`);
      }
      
      // Check if wallet is installed/available
      const isAvailable = await connectorToUse.available();
      if (!isAvailable) {
        throw new Error(`${wallet} wallet is not installed or available`);
      }
      
      await connect({ connector: connectorToUse });
      dismiss(toastId);
    } catch (err: unknown) {
      setIsConnecting(false);
      dismiss(toastId);
      console.error("Connection failed:", err);

      // More specific error messages
      let errorMessage = `Failed to connect to ${wallet}. Please try again.`;
      if (typeof err === "object" && err !== null && "message" in err && typeof (err as { message: unknown }).message === "string") {
        const message = (err as { message: string }).message;
        if (message.includes('not installed')) {
          errorMessage = `${wallet} wallet is not installed. Please install it first.`;
        } else if (message.includes('rejected')) {
          errorMessage = 'Connection was rejected by the wallet.';
        }
      }

      toast.error(errorMessage);
    }
  }, [connect, toast, dismiss, isConnecting]);

  const handleDisconnect = useCallback(() => {
    setWalletConnected(false); // Update global state
    clearPersistedConnection(); // Clear persisted data
    disconnect(); // Disconnect from Starknet
    setWalletName("");
    setHasProcessedSuccess(false);
    setIsConnecting(false);
    toast.success("Wallet disconnected successfully!");
    onOpenChange(false); // Close modal
  }, [setWalletConnected, clearPersistedConnection, disconnect, toast, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isConnected ? "Wallet Connected" : "Connect Wallet"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isConnected 
              ? "Your wallet is connected and ready to use" 
              : "Choose your preferred wallet to connect"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {!isConnected ? (
            <>
              <Button
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
                size="lg"
                onClick={() => handleConnect("braavos")}
                disabled={isConnecting}
              >
                <Image
                  src="/bravos.webp"
                  alt="Bravos Logo"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                {isConnecting ? "Connecting..." : "Connect with Braavos"}
              </Button>

              <Button
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
                size="lg"
                onClick={() => handleConnect("argent")}
                disabled={isConnecting}
              >
                <Image
                  src="/argent.png"
                  alt="Argent Logo"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                {isConnecting ? "Connecting..." : "Connect with Argent"}
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-700 font-medium">
                  Connected with {connector?.id}
                </p>
                <p className="text-green-600 text-sm break-all mt-1">
                  {address}
                </p>
              </div>
              
              <Button
                className="w-full"
                variant="outline"
                size="lg"
                onClick={handleDisconnect}
              >
                Disconnect Wallet
              </Button>
            </div>
          )}
        </div>

        {error && (
          <div className="text-center pt-2 text-sm text-red-500">
            {error.message}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { WalletModal };