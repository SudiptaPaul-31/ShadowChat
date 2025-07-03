'use client'
import { useState } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { Profile } from "@/lib/types";

const Chat = () => {
    const profiles: Profile[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          image: "/profile.png",
          status: 'online',
          lastMessage: 'Hey! How are you doing today?',
          time: '2:30 PM',
          unread: 2
        },
        {
          id: '2',
          name: 'Mike Chen',
          image: "/profile2.png",
          status: 'online',
          lastMessage: 'Can we schedule a meeting?',
          time: '1:45 PM'
        },
        {
          id: '3',
          name: 'Emma Wilson',
          image: "/profile2.png",
          status: 'offline',
          lastMessage: 'Thanks for the help!',
          time: '11:20 AM'
        }
      ];
    const [activeProfile, setActiveProfile] = useState<string>('');
  
    const selectedProfile = profiles.find(p => p.id === activeProfile);
  
    return (
      <div className="h-screen bg-[#070312] flex">
        <ChatSidebar 
          profiles={profiles} 
          activeProfile={activeProfile} 
          onProfileSelect={setActiveProfile} 
        />
        <ChatWindow activeProfile={selectedProfile} />
      </div>
    );
}

export default Chat
