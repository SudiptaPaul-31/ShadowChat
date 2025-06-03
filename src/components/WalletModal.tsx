"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  connect,
  disconnect,
  type ConnectOptions,
  type DisconnectOptions,
} from "@starknet-io/get-starknet";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";

interface WalletModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletModal = ({ isOpen, onOpenChange }: WalletModalProps) => {
  const [walletName, setWalletName] = useState("");
  const router = useRouter();
  const { toast, dismiss } = useToast();

  const handleConnect = async (options?: ConnectOptions) => {
    onOpenChange(false);
    
    const loadingToastId = toast.loading("Connecting to wallet...");
    
    try {
      const wallet = await connect(options);
      if (wallet) {
        setWalletName(wallet.name || "");
        dismiss(loadingToastId);
        toast.success(`Successfully connected to ${wallet.name || 'wallet'}!`);
        router.push("/");
        onOpenChange(false);
      } else {
        dismiss(loadingToastId);
        toast.error("No wallet selected. Please try again.");
      }
    } catch (error) {
      console.error("Connection failed:", error);
      dismiss(loadingToastId);
      toast.error("Failed to connect to wallet. Please try again.");
    }
  };

  const handleDisconnect = async (options?: DisconnectOptions) => {
    try {
      await disconnect(options);
      setWalletName("");
      toast.success("Wallet disconnected successfully!");
    } catch (err) {
      console.error("Disconnection failed:", err);
      toast.error("Failed to disconnect wallet. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Connect Wallet</DialogTitle>
          <DialogDescription className="text-center">
            Choose your preferred wallet to connect
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <Button
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
            size="lg"
            onClick={() =>
              handleConnect({ include: ["braavos"] })
            }
          >
            <Image
              src="/bravos.webp"
              alt="Bravos Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Connect with Bravos
          </Button>

          <Button
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
            size="lg"
            onClick={() =>
              handleConnect({ include: ["argentX"] })
            }
          >
            <Image
              src="/argent.png"
              alt="Argent Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Connect with Argent
          </Button>

          <Button
            className="w-full"
            variant="outline"
            size="lg"
            onClick={() => handleDisconnect()}
          >
            Disconnect
          </Button>
        </div>

        {walletName && (
          <div className="text-center pt-4 text-sm text-green-500">
            Connected: {walletName}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { WalletModal };