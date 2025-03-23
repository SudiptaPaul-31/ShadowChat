"use client";

import { Shield, Users, Lock, Vote, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/home/hero";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";
import Technology from "@/components/technology/Technology";

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
        
        <Technology />

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
