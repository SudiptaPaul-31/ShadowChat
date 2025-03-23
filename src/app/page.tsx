"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/home/hero";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";
import Features from "@/components/ui/Features";

export default function Home() {
  // const handleScroll = (id: string) => {
  //   const element = document.getElementById(id)
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     })
  //   }
  // }
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* <header className="sticky top-0 z-50 border-b backdrop-blur-sm bg-background/80">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-700">
              <div className="absolute inset-0 opacity-80 mix-blend-overlay">
                <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path
                    d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12Z"
                    fill="white"
                    fillOpacity=".8"
                  />
                </svg>
              </div>
            </div>
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
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Login
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </header> */}

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-muted/30">
          <Features />
        </section>

        {/* Technology Section */}
        <section id="technology" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Built with Modern Technology
                </h2>
                <p className="text-lg text-muted-foreground">
                  ShadowChat leverages cutting-edge web3 technologies to provide
                  a secure, private, and decentralized communication platform.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-xl">
                        Next.js & TypeScript
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Optimized for a fast and scalable web experience with
                        type-safe code.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-xl">
                        Starknet & Cairo Smart Contracts
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Secure, scalable interactions on the Starknet Layer 2
                        ecosystem.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-xl">
                        IPFS & Arweave Storage
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Decentralized storage solutions for messages and media.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-xl">
                        Web3 Authentication
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Secure wallet-based login using Starknet wallets
                        (ArgentX & Braavos).
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-xl border bg-background p-2 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-background rounded-xl" />
                <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/20">
                  <div className="h-full w-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-background/80 flex items-center justify-center">
                    <div className="relative w-4/5 aspect-square rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-700/30 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full blur-2xl bg-gradient-to-br from-indigo-500/20 to-purple-700/20" />
                      <div className="relative w-4/5 aspect-square rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-700/40 flex items-center justify-center">
                        <div className="w-4/5 aspect-square rounded-full bg-gradient-to-br from-indigo-500/50 to-purple-700/50 flex items-center justify-center">
                          <div className="text-white font-bold text-center">
                            <div className="text-xs sm:text-sm md:text-base lg:text-lg">
                              STARKNET
                            </div>
                            <div className="text-xs opacity-70">POWERED</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cta Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-xl border bg-card p-8 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-background" />
              <div className="relative flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="space-y-4 max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Ready to Experience the Future of Private Communication?
                  </h2>
                  <p className="text-muted-foreground">
                    Join our waitlist to be among the first to access ShadowChat
                    when we launch.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800 shadow-md min-w-36"
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <Footer />
      </footer>
    </div>
  );
}
