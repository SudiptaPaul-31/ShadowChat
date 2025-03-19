"use client";

import {
  ChevronRight,
  Shield,
  Users,
  Lock,
  Vote,
  Zap,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

export default function Home() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b backdrop-blur-sm bg-background/80">
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
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:40px_40px] bg-no-repeat" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

          <div className="container relative py-10 md:py-20 space-y-10 mx-auto px-4">
            <div className="flex flex-col items-center text-center space-y-2 max-w-3xl mx-auto">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                  <span>Coming Soon</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <span className="block bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Privacy-Focused
                  </span>
                  <span className="block">Decentralized Social Network</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Express yourself freely in a secure, end-to-end encrypted
                  platform with complete control over your digital identity.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
                >
                  Get Early Access
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border bg-background shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-background" />
              <div className="aspect-[16/9] overflow-hidden rounded-t-xl bg-muted/20">
                <div className="h-full w-full bg-gradient-to-br from-background via-muted/50 to-muted flex items-center justify-center p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                    <div className="group bg-card/80 backdrop-blur-sm rounded-xl border shadow-lg p-6 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
                      {/* 3d gradient effect */}
                      <div className="absolute -bottom-4 -left-4 -right-4 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 blur-xl opacity-0 z-0 transition-opacity duration-300 group-hover:opacity-50"></div>
                      <div className="absolute -bottom-8 -left-8 -right-8 h-16 bg-gradient-to-r from-indigo-600 to-blue-500 blur-2xl opacity-0 z-0 transition-opacity duration-300 group-hover:opacity-30"></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="rounded-full bg-indigo-500/10 p-2 w-fit">
                          <MessageSquare className="h-5 w-5 text-indigo-500" />
                        </div>
                        <h3 className="text-lg font-semibold mt-4">
                          Encrypted Messages
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          End-to-end encrypted conversations that remain private
                          and secure.
                        </p>
                      </div>
                    </div>

                    <div className="group bg-card/80 backdrop-blur-sm rounded-xl border shadow-lg p-6 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 hover:shadow-xl">
                      {/* 3d gradient effect */}
                      <div className="absolute -bottom-4 -left-4 -right-4 h-20 bg-gradient-to-r from-purple-500 to-blue-400 blur-xl opacity-0 z-0 transition-opacity duration-300 group-hover:opacity-50"></div>
                      <div className="absolute -bottom-8 -left-8 -right-8 h-16 bg-gradient-to-r from-violet-600 to-purple-500 blur-2xl opacity-0 z-0 transition-opacity duration-300 group-hover:opacity-30"></div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="rounded-full bg-purple-500/10 p-2 w-fit">
                          <Users className="h-5 w-5 text-purple-500" />
                        </div>
                        <h3 className="text-lg font-semibold mt-4">
                          Anonymous Communities
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Join groups with like-minded individuals while
                          maintaining your privacy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 divide-x border-t">
                <div className="flex items-center justify-center p-2 md:p-8">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs md:text-sm text-muted-foreground">
                      Zero-knowledge Authentication
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center p-2 md:p-8">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs md:text-sm text-muted-foreground">
                      Starknet Powered Security
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-muted/30">
          <div className="container space-y-12 mx-auto px-4">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <p className="text-muted-foreground text-lg">
                ShadowChat combines cutting-edge technology with user-friendly
                design to provide a secure and private communication platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                    <Shield className="h-5 w-5 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Anonymous Profiles</h3>
                  <p className="text-muted-foreground">
                    Engage with the platform without linking your real-world
                    identity, maintaining complete privacy.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Encrypted Messaging</h3>
                  <p className="text-muted-foreground">
                    End-to-end encryption ensures your conversations remain
                    private and unreadable to third parties.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                    <Users className="h-5 w-5 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-semibold">Private Communities</h3>
                  <p className="text-muted-foreground">
                    Create and join chat groups with like-minded individuals,
                    all while maintaining anonymity.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                    <Lock className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Zero-Knowledge Authentication
                  </h3>
                  <p className="text-muted-foreground">
                    Verify your identity without revealing personal information
                    through advanced cryptographic techniques.
                  </p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                    <Vote className="h-5 w-5 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-semibold">On-Chain Governance</h3>
                  <p className="text-muted-foreground">
                    Implement smart contract-based rules and democratic voting
                    mechanisms within communities.
                  </p>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                    <Zap className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    Starknet Integration
                  </h3>
                  <p className="text-muted-foreground">
                    Fast and low-cost transactions powered by Starknet&apos;s
                    Layer 2 scalability solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
      <Footer />
    </div>
  );
}
