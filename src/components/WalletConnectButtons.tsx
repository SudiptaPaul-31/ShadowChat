"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const WalletConnectButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        size="lg"
        className="bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
        onClick={() => alert("Bravos wallet connection mocked!")}
      >
        <Image
          src="/bravos.webp"
          alt="Argent Logo"
          width={16}
          height={16}
          className="mr-2"
        />
        Connect with Bravos
      </Button>
      <Button
        size="lg"
        className="bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800"
        onClick={() => alert("Argent wallet connection mocked!")}
      >
        <Image
          src="/argent.png"
          alt="Argent Logo"
          width={16}
          height={16}
          className="mr-2"
        />
        Connect with Argent
      </Button>
    </div>
  );
};

export default WalletConnectButtons;