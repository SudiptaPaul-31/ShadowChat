import { Phone, Video, Search } from "lucide-react";
import { Profile } from "@/lib/types";
import Image from "next/image";

const ChatHeader: React.FC<{ profile?: Profile }> = ({ profile }) => (
  <div className="bg-[#120C22] px-6 py-4 flex items-center justify-between border-b border-gray-700">
    <div className="flex items-center">
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
            <h2 className="text-white font-medium">{profile.name}</h2>
            <p className="text-gray-400 text-sm">
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
