"use client";

import Image from "next/image";
import { Button } from "./button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { useToast } from "./toast";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.success( "Wallet has been successfully disconnected.");
  };

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-sm bg-background/80">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2">
          <Image src="/icon.png" alt="shadow-chat" width={32} height={32} quality={90} />
          <button
            onClick={() => handleScroll("hero")}
            className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent cursor-pointer"
          >
            ShadowChat
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => handleScroll("features")}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </button>
          <button
            onClick={() => handleScroll("technology")}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Technology
          </button>
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <Switch
              checked={theme === "dark"}
              onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`${theme === "light" ? "bg-gradient-to-r from-indigo-500 to-purple-700" : ""}`}
              aria-label="Toggle theme"
            />
          )}

          <Button asChild variant="ghost" size="sm" className="hidden md:flex">
            {isConnected ? (
              <button 
                onClick={() => router.push('/anonymous-profile')}
                className="cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                title="Click to view your anonymous profile"
              >
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </button>
            ) : (
              <Link href="/authentication">Connect Your Wallet</Link>
            )}
          </Button>

          {isConnected && (
            <Button onClick={handleDisconnect} className="cursor-pointer" variant="secondary">
              Disconnect Wallet
            </Button>
          )}

        </div>
      </div>
    </header>
  );
}
