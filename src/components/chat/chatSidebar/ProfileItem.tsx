import { Profile } from "@/lib/types";
import Image from "next/image";

const ProfileItem: React.FC<{ profile: Profile; isActive: boolean; onClick: () => void }> = ({ 
    profile, 
    isActive, 
    onClick 
  }) => (
    <div
      onClick={onClick}
      className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
        isActive ? 'bg-[#160A36]' : 'hover:bg-[#160A36]'
      }`}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden  flex items-center justify-center text-xl">
           <Image src={profile.image} alt={profile.name} width={48} height={48} />
        </div>
        {profile.status === 'online' && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
        )}
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium truncate">{profile.name}</h3>
          <span className="text-gray-400 text-sm">{profile.time}</span>
        </div>
        <p className="text-gray-400 text-sm truncate">{profile.lastMessage}</p>
      </div>
      {profile.unread && (
        <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {profile.unread}
        </div>
      )}
    </div>
  );

  export default ProfileItem;