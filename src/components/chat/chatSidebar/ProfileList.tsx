import { Profile } from "@/lib/types";
import ProfileItem from "./ProfileItem";

const ProfileList: React.FC<{ profiles: Profile[]; activeProfile: string; onProfileSelect: (id: string) => void }> = ({ 
    profiles, 
    activeProfile, 
    onProfileSelect 
  }) => (
    <div className="flex-1 overflow-y-auto">
      {profiles.map((profile) => (
        <ProfileItem
          key={profile.id}
          profile={profile}
          isActive={activeProfile === profile.id}
          onClick={() => onProfileSelect(profile.id)}
        />
      ))}
    </div>
  );

  
  export default ProfileList;