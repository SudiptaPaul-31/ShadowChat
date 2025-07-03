"use client";
import { useState } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { Profile } from "@/lib/types";

const Chat = () => {
  const profiles: Profile[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      image: "/profile.png",
      status: "online",
      lastMessage: "Hey! How are you doing today?",
      time: "2:30 PM",
      unread: 2,
    },
    {
      id: "2",
      name: "Mike Chen",
      image: "/profile2.png",
      status: "online",
      lastMessage: "Can we schedule a meeting?",
      time: "1:45 PM",
    },
    {
      id: "3",
      name: "Emma Wilson",
      image: "/profile2.png",
      status: "offline",
      lastMessage: "Thanks for the help!",
      time: "11:20 AM",
    },
  ];
  const [activeProfile, setActiveProfile] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedProfile = profiles.find((p) => p.id === activeProfile);

  return (
    <div className="h-screen bg-[#070312] flex flex-col md:flex-row">
      {/* Sidebar Drawer for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0A0517] border-r border-gray-800 transform transition-transform duration-300 md:static md:translate-x-0 md:w-80 md:flex md:flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        <ChatSidebar
          profiles={profiles}
          activeProfile={activeProfile}
          onProfileSelect={(id) => {
            setActiveProfile(id);
            setSidebarOpen(false);
          }}
        />
      </div>
      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatWindow
          activeProfile={selectedProfile}
          onSidebarToggle={() => setSidebarOpen(true)}
        />
      </div>
    </div>
  );
};

export default Chat;
