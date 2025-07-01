"use client";

import React, { useState, useEffect } from "react";
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

interface WalletModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletModal = ({ isOpen, onOpenChange }: WalletModalProps) => {
  const { toast, dismiss } = useToast();
  const router = useRouter();

  const { connect, isSuccess, error, } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, connector, } = useAccount();

  const [walletName, setWalletName] = useState("");

  useEffect(() => {
    if (connector?.id) {
      setWalletName(connector.id);
    }
  }, [connector]);



  useEffect(() => {
    if (isSuccess && walletName) {
      toast.success(`Connected to ${walletName}!`);
      router.push("/");
    }
    else if (error) {
      toast.error("Connection aborted")
    }
  }, [walletName, error, isSuccess, router]);

  const handleConnect = async (wallet: "argent" | "braavos") => {
    onOpenChange(false);
    const toastId = toast.loading(`Connecting to ${wallet}...`);

    try {
      const connectorToUse = wallet === "argent" ? argent() : braavos();
      await connect({ connector: connectorToUse });
      dismiss(toastId);
    } catch (err) {
      dismiss(toastId);
      console.error("Connection failed:", err);
      toast.error(`Failed to connect to ${wallet}. Try again.`);
    }
  };




  const handleDisconnect = () => {
    disconnect();
    setWalletName("");
    toast.success("Wallet disconnected successfully!");
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
            onClick={() => handleConnect("braavos")}
          >
            <Image
              src="/bravos.webp"
              alt="Bravos Logo"
              width={24}
              height={24}
              className="mr-2"
            />
            Connect with Braavos
          </Button>

          <Button
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
            size="lg"
            onClick={() => handleConnect("argent")}
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
            onClick={handleDisconnect}
            disabled={!address}
          >
            Disconnect
          </Button>
        </div>

        {address && (
          <div className="text-center pt-4 text-sm text-green-500 break-all">
            Connected: {address}
          </div>
        )}

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
