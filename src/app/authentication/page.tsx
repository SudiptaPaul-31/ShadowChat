// / 3. Updated Authentication component
"use client";

import React, { useState } from "react";
import { WalletModal } from "@/components/WalletModal";
import { Button } from "@/components/ui/button";
import { Wallet, CheckCircle } from "lucide-react";
import { useWalletContext } from "@/context/WalletContext";
import { useRouter } from "next/navigation";

export default function Authentication() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isConnected, address, connectorName } = useWalletContext();
  const router = useRouter();

  return (
    <section id="authentication" className="relative min-h-screen">
      {/* Background Grid and Gradient */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:40px_40px] bg-no-repeat" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      <div className="container relative py-16 md:py-24 space-y-10 mx-auto px-4">
        {/* Heading and Subtext */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {isConnected ? "Wallet Connected" : "Connect Your Wallet"}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isConnected 
              ? `Successfully connected with ${connectorName}` 
              : "Securely log in using your Starknet wallet for a privacy-focused experience."
            }
          </p>
        </div>

        {/* Wallet Connect Button */}
        <div className="flex justify-center">
          {isConnected ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Wallet Connected</span>
              </div>
              <button 
                onClick={() => router.push('/anonymous-profile')}
                className="text-sm text-muted-foreground break-all max-w-md hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer underline decoration-dotted underline-offset-4"
                title="Click to view your anonymous profile"
              >
                {address}
              </button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsModalOpen(true)}
              >
                <Wallet className="mr-2 h-5 w-5" />
                Manage Wallet
              </Button>
            </div>
          ) : (
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
              onClick={() => setIsModalOpen(true)}
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
          )}
          
          <WalletModal
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
          />
        </div>

        {/* Info Card */}
        <div className="relative mx-auto max-w-3xl rounded-xl border bg-background shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-background" />
          <div className="p-6 text-center">
            <p className="text-muted-foreground">
              Your connection is secured with zero-knowledge authentication and Starknet-powered security.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}