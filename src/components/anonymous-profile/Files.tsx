"use client";

import {
  Calendar,
  Download,
  File,
  HardDrive,
  Share,
  Trash2,
} from "lucide-react";
import type { UploadedFile } from "./type";
import { motion } from "motion/react";
import { cardContainerVariants, cardVariants } from "./motion";

function Files() {
  const uploadedFiles: UploadedFile[] = [
    {
      id: 1,
      name: "whitepaper-v2.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploaded: "2024-05-20",
      thumbnail: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "project-demo.mp4",
      type: "Video",
      size: "15.7 MB",
      uploaded: "2024-05-18",
      thumbnail: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "tokenomics-chart.png",
      type: "Image",
      size: "890 KB",
      uploaded: "2024-05-15",
      thumbnail: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "smart-contract.sol",
      type: "Code",
      size: "45 KB",
      uploaded: "2024-05-12",
      thumbnail: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardContainerVariants}
    >
      <div className="flex items-center justify-between my-6">
        <h2 className="text-2xl font-bold text-white">Your Files</h2>
      </div>

      {uploadedFiles.length > 0 ? (
        <div className="space-y-3">
          {uploadedFiles.map((file, index) => (
            <motion.div
              variants={cardVariants}
              custom={index}
              key={file.id}
              className="bg-background  rounded-[10px] hover:border-purple-500/50 shadow-md  dark:border-gray-800 border transition-colors"
            >
              <div className="flex flex-col md:flex-row space-y-3 p-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                    <File className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium ">{file.name}</h3>
                    <div className="flex  items-center gap-4 text-sm text-muted-foreground">
                      <span>{file.type}</span>
                      <span className="flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />
                        {file.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(file.uploaded).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-items-start  md:gap-5 gap-12">
                  <button className="text-muted-foreground hover:text-white">
                    <Download className="w-4 h-4" />
                  </button>

                  <button className="text-muted-foreground hover:text-white">
                    <Share className="w-4 h-4" />
                  </button>

                  <button className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-900/50 border-gray-800">
          <div className="text-center py-12">
            <File className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Files Uploaded
            </h3>
            <p className="text-gray-400 mb-6">
              Upload your first file to share securely with your groups
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-3xl">
              Upload File
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Files;
