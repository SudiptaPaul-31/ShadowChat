
import { FaGithub, FaXTwitter, FaTelegram } from "react-icons/fa6";
import Link from "next/link";
import React from "react";
import { ExternalLink } from "../external-link";

function Footer() {
  return (
    <div className="container flex flex-col md:h-24 md:flex-row items-center justify-between gap-4 mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
        <span className="text-sm font-semibold">ShadowChat</span>
        <p className="text-xs text-muted-foreground md:pl-4">
          © {new Date().getFullYear()} ShadowChat. All rights reserved.
        </p>
      </div>

      <div className="flex gap-3">
        <ExternalLink href='#'>
          <FaXTwitter className={stylesSocialIcons}/>
        </ExternalLink>
         <ExternalLink href='https://github.com/SudiptaPaul-31/ShadowChat'>
          <FaGithub className={stylesSocialIcons}/>
        </ExternalLink>
         <ExternalLink href='https://t.me/shadowchat_od'>
          <FaTelegram className={stylesSocialIcons}/>
        </ExternalLink>
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
  );
}

export default Footer;

const stylesSocialIcons = "hover:opacity-85 transition-colors"