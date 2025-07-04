import { Profile } from "@/lib/types";
import Image from "next/image";

const ProfileItem: React.FC<{
  profile: Profile;
  isActive: boolean;
  onClick: () => void;
}> = ({ profile, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center px-2 sm:px-4 py-2 sm:py-3 cursor-pointer transition-colors ${
      isActive ? "bg-[#160A36]" : "hover:bg-[#160A36]"
    }`}
  >
    <div className="relative">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center text-lg sm:text-xl">
        <Image src={profile.image} alt={profile.name} width={48} height={48} />
      </div>
      {profile.status === "online" && (
        <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
      )}
    </div>
    <div className="ml-2 sm:ml-3 flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium truncate text-sm sm:text-base">
          {profile.name}
        </h3>
        <span className="text-gray-400 text-xs sm:text-sm">{profile.time}</span>
      </div>
      <p className="text-gray-400 text-xs sm:text-sm truncate">
        {profile.lastMessage}
      </p>
    </div>
    {profile.unread && (
      <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {profile.unread}
      </div>
    )}
  </div>
);

export default ProfileItem;
