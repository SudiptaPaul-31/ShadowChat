"use client";

import { File, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import WalletCard from "@/components/anonymous-profile/wallet-card";
import { Walletvariant } from "@/components/anonymous-profile/motion";
import Groups from "@/components/anonymous-profile/Groups";
import Files from "@/components/anonymous-profile/Files";
import Navbar from "@/components/ui/Navbar";

function Page() {
  const [activeTab, setActiveTab] = useState<"groups" | "files">("groups");

  return (
    <div>
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <WalletCard />

        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={Walletvariant}
            className="bg-secondary-foreground/80 dark:bg-gray-900/50 space-x-5 rounded-[10px] flex items-center border  p-1 w-fit border-gray-800"
          >
            <button
              // value="groups"
              onClick={() => setActiveTab("groups")}
              className={` flex text-sm items-center py-1 px-3 rounded-[10px] transition-colors duration-300 ease-in ${
                activeTab == "groups"
                  ? "bg-purple-500/20   border-gray-800 text-purple-400"
                  : "text-gray-300"
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Owned Groups
            </button>

            <button
              onClick={() => setActiveTab("files")}
              className={`flex items-center text-sm py-1 px-3 rounded-[10px] transition-colors ease-in duration-300 ${
                activeTab === "files"
                  ? "bg-purple-500/20 text-purple-400 "
                  : "text-gray-300"
              }`}
            >
              <File className="w-4 h-4 mr-2" />
              Uploaded Files
            </button>
          </motion.div>

          {activeTab === "groups" && <Groups />}

          {activeTab === "files" && <Files />}
        </div>
      </div>
    </div>
  );
}

export default Page;
