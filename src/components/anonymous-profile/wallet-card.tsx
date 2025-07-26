"use client";

import { Copy, LogOut, Wallet } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { useAccount, useDisconnect } from "@starknet-react/core";

function truncateAddress(address: string) {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}

function WalletCard() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-background backdrop-blur-sm shadow-lg p-5 mb:p-10 border mb-5 rounded-2xl md:mb-8">
        <div className="flex p-2 h-full items-center mb-8 text-2xl md:text-3xl font-semibold gap-2 ">
          <Wallet className="w-6 h-6 text-purple-400" />
          Wallet Connection
        </div>
        <div className="text-red-500 text-lg">Wallet not connected.</div>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-background backdrop-blur-sm shadow-lg p-5 mb:p-10 border mb-5 rounded-2xl md:mb-8">
      <div>
        <div className="flex p-2 h-full items-center mb-8 text-2xl md:text-3xl font-semibold gap-2 ">
          <Wallet className="w-6 h-6 text-purple-400" />
          Wallet Connection
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-purple-600 dark:text-purple-300 text-base md:text-lg break-all">
            {truncateAddress(address!)}
          </span>
          <button
            onClick={() => copyToClipboard(address!)}
            className="p-1 rounded hover:bg-purple-100 dark:hover:bg-purple-900"
            title="Copy address"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={disconnect}
            className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
            title="Disconnect wallet"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default WalletCard;
