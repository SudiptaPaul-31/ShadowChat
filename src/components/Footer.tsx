import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col md:h-24 md:flex-row items-center justify-between gap-4 mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
          <span className="text-sm font-semibold">ShadowChat</span>
          <p className="text-xs text-muted-foreground md:pl-4">
            © {new Date().getFullYear()} ShadowChat. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};
