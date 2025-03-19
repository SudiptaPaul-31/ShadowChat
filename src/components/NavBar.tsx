import React from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
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
  );
};
