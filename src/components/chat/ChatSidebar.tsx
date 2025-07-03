import { Profile } from "@/lib/types";
import SearchBar from "./chatSidebar/SearchBar";
import ProfileList from "./chatSidebar/ProfileList";

const ChatSidebar: React.FC<{ profiles: Profile[]; activeProfile: string; onProfileSelect: (id: string) => void }> = ({ 
    profiles, 
    activeProfile, 
    onProfileSelect 
  }) => (
    <div className="w-80 bg-[#0A0517] flex flex-col border-r border-gray-800">
      <div className="p-4 border-b border-gray-800 flex items-center justify-center">
        <h1 className="text-white text-xl text-center font-semibold">Chats</h1>
      </div>
      <SearchBar />
      <ProfileList 
        profiles={profiles} 
        activeProfile={activeProfile} 
        onProfileSelect={onProfileSelect} 
      />
    </div>
  );

  export default ChatSidebar;