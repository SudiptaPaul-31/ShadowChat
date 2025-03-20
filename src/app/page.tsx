"use client"

import Link from "next/link"
import { ChevronRight, Shield, Users, Lock, Vote, Zap, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Hero from "@/components/home/hero"

export default function Home() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
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
        <Hero />

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-muted/30">
          <div className="container space-y-12 mx-auto px-4">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="text-muted-foreground text-lg">
                ShadowChat combines cutting-edge technology with user-friendly design to provide a secure and private
                communication platform.
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
                    Engage with the platform without linking your real-world identity, maintaining complete privacy.
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
                    End-to-end encryption ensures your conversations remain private and unreadable to third parties.
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
                    Create and join chat groups with like-minded individuals, all while maintaining anonymity.
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
                  <h3 className="text-xl font-semibold">Zero-Knowledge Authentication</h3>
                  <p className="text-muted-foreground">
                    Verify your identity without revealing personal information through advanced cryptographic
                    techniques.
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
                    Implement smart contract-based rules and democratic voting mechanisms within communities.
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
                  <h3 className="text-xl font-semibold">Starknet Integration</h3>
                  <p className="text-muted-foreground">
                    Fast and low-cost transactions powered by Starknet&apos;s Layer 2 scalability solutions.
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Built with Modern Technology</h2>
                <p className="text-lg text-muted-foreground">
                  ShadowChat leverages cutting-edge web3 technologies to provide a secure, private, and decentralized
                  communication platform.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-xl">Next.js & TypeScript</span>
                      <p className="text-sm text-muted-foreground">
                        Optimized for a fast and scalable web experience with type-safe code.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-xl">Starknet & Cairo Smart Contracts</span>
                      <p className="text-sm text-muted-foreground">
                        Secure, scalable interactions on the Starknet Layer 2 ecosystem.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-xl">IPFS & Arweave Storage</span>
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
                      <span className="font-medium text-xl">Web3 Authentication</span>
                      <p className="text-sm text-muted-foreground">
                        Secure wallet-based login using Starknet wallets (ArgentX & Braavos).
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
                            <div className="text-xs sm:text-sm md:text-base lg:text-lg">STARKNET</div>
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
                    Join our waitlist to be among the first to access ShadowChat when we launch.
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
        <div className="container flex flex-col md:h-24 md:flex-row items-center justify-between gap-4 mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
            <span className="text-sm font-semibold">ShadowChat</span>
            <p className="text-xs text-muted-foreground md:pl-4">
              © {new Date().getFullYear()} ShadowChat. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}