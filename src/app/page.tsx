"use client";

import { Button } from "@/components/ui/button";
import Hero from "@/components/home/hero";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/Footer";

import Features from "@/components/features/Features";

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
          <Features />
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
