"use client";

import { Copy, LogOut, Wallet } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Walletvariant } from "./motion";

function WalletCard() {
  const [walletConnected, setWalletConnected] = useState(true);

  const walletAddress = "0x742d35Cc6634C0532925a3b8D4C2C4e";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
  };

  return (
    <motion.div
      variants={Walletvariant}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-background backdrop-blur-sm shadow-lg p-5 mb:p-10 border mb-5 rounded-2xl md:mb-8"
    >
      <div>
        <div className="flex p-2 h-full items-center mb-8 text-2xl md:text-3xl font-semibold gap-2 ">
          <Wallet className="w-6 h-6 text-purple-400" />
          Wallet Connection
        </div>
      </div>
      <div>
        {walletConnected ? (
          <div className="flex flex-col md:flex-row overflow-hidden items-center justify-between p-4 dark:bg-gray-900/50 bg-secondary-foreground/80 rounded-lg">
            <div className="flex items-center w-full gap-3">
              <div className="space-y-1.5 w-full">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-gray-400">Connected Wallet</p>
                </div>
                <div className="break-words ">
                  <p className="font-mono  text-white">{walletAddress}...</p>
                </div>
              </div>
            </div>
            <div className="flex w-full md:justify-end mt-4 md:m-0 gap-7 md:gap-5">
              <button
                onClick={() => copyToClipboard(walletAddress)}
                className="text-gray-400 cursor-pointer hover:text-white"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={disconnectWallet}
                className="text-red-400 cursor-pointer hover:text-red-300"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Wallet className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No wallet connected</p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-3xl">
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default WalletCard;
