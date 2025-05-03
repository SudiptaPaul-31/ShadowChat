"use client";

import React, { useState } from "react";
import { WalletModal } from "@/components/WalletModal";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export default function Authentication() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              Connect Your Wallet
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Securely log in using your Starknet wallet for a privacy-focused experience.
          </p>
        </div>

        {/* Wallet Connect Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
            onClick={() => setIsModalOpen(true)}
          >
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
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
