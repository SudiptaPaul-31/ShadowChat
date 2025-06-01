"use client";

import { Calendar, Users } from "lucide-react";
import type { Group } from "./type";
import { motion } from "motion/react";
import Image from "next/image";
import { cardContainerVariants, cardVariants } from "./motion";

function Groups() {
  const ownedGroups: Group[] = [
    {
      id: 1,
      name: "Crypto Enthusiasts",
      members: 1247,
      created: "2024-01-15",
      avatar: "",
      isPrivate: false,
    },
    {
      id: 2,
      name: "DeFi Developers",
      members: 892,
      created: "2024-02-20",
      avatar: "",
      isPrivate: true,
    },
    {
      id: 3,
      name: "NFT Collectors",
      members: 2156,
      created: "2024-03-10",
      avatar: "",
      isPrivate: false,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardContainerVariants}
      className=""
    >
      <div className="flex items-center justify-between my-6">
        <h2 className="text-2xl font-bold text-white">Your Groups</h2>
      </div>

      {ownedGroups.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ownedGroups.map((group, index) => (
            <motion.div
              variants={cardVariants}
              custom={index}
              key={group.id}
              className="bg-background  shadow-md  dark:border-gray-800 border rounded-[10px] hover:shadow-lg transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex justify-center items-center overflow-hidden  relative bg-card-foreground">
                      {group.avatar ? (
                        <Image
                          src={group.avatar}
                          alt={group.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="">
                          <span className="text-2xl text-white font-medium">
                            {group.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">{group.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {group.members.toLocaleString()} members
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Created {new Date(group.created).toLocaleDateString()}
                  </div>
                  {group.isPrivate ? (
                    <div className="bg-indigo-500/10 px-4 py-1 rounded-full text-indigo-500 text-sm font-medium">
                      Private
                    </div>
                  ) : (
                    <div className="bg-purple-500/10 px-4 py-1 rounded-full text-purple-500 text-sm font-medium">
                      Public
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-900/50 border-gray-800">
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Groups Yet
            </h3>
            <p className="text-gray-400 mb-6">
              Create your first anonymous group to get started
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-3xl">
              Create Group
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Groups;
