import React from "react";
import { Button } from "./ui/button";
import { ChevronRight, Shield, Users, Lock, MessageSquare } from "lucide-react";

export const HeroSection = () => {
  return (
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
              Express yourself freely in a secure, end-to-end encrypted platform
              with complete control over your digital identity.
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
                      End-to-end encrypted conversations that remain private and
                      secure.
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
                      Join groups with like-minded individuals while maintaining
                      your privacy.
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
  );
};
