import { Phone, Video, Search, Menu } from "lucide-react";
import { Profile } from "@/lib/types";
import Image from "next/image";

const ChatHeader: React.FC<{
  profile?: Profile;
  onSidebarToggle?: () => void;
}> = ({ profile, onSidebarToggle }) => (
  <div className="bg-[#120C22] px-4 sm:px-6 py-4 flex items-center justify-between border-b border-gray-700">
    <div className="flex items-center">
      {/* Hamburger menu for mobile */}
      {onSidebarToggle && (
        <button
          className="md:hidden mr-3 text-gray-400 hover:text-white transition-colors"
          onClick={onSidebarToggle}
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
      {profile && (
        <>
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-lg">
            <Image
              src={profile.image}
              alt={profile.name}
              width={40}
              height={40}
            />
          </div>
          <div className="ml-3">
            <h2 className="text-white font-medium text-base sm:text-lg md:text-xl">
              {profile.name}
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              {profile.status === "online" ? "Online" : "Last seen recently"}
            </p>
          </div>
        </>
      )}
    </div>
    <div className="flex items-center space-x-4">
      <button className="text-gray-400 hover:text-white transition-colors">
        <Search className="w-5 h-5" />
      </button>
      <button className="text-gray-400 hover:text-white transition-colors">
        <Phone className="w-5 h-5" />
      </button>
      <button className="text-gray-400 hover:text-white transition-colors">
        <Video className="w-5 h-5" />
      </button>
    </div>
  </div>
);

export default ChatHeader;
