// src/components/profile/ProfileInfo.jsx
import { useProfile } from "../../context/ProfileContext";

export default function ProfileInfo() {
  const { profile } = useProfile();

  return (
    <div className="max-w-3xl mx-auto mt-20 px-6 text-left">
      <h2 className="text-2xl font-bold">{profile.name}</h2>
      <p className="text-muted-foreground">{profile.email}</p>
      <p className="text-sm mt-1">{profile.job}</p>
      <p className="text-xs text-muted-foreground">{profile.location}</p>

      <div className="mt-6">
        <h3 className="font-semibold">Bio</h3>
        <p className="text-sm text-muted-foreground">
          {profile.bio || "No bio yet."}
        </p>
      </div>
    </div>
  );
}
