import React from 'react'
import { ChevronRight } from "lucide-react"
const Technology = () => {
  return (
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
  )
}

export default Technology