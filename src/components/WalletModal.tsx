"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface WalletModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletModal = ({ isOpen, onOpenChange }: WalletModalProps) => {
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
            onClick={() => {
              alert("Bravos wallet connection mocked!");
              onOpenChange(false);
            }}
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
            onClick={() => {
              alert("Argent wallet connection mocked!");
              onOpenChange(false);
            }}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { WalletModal };
