// src/pages/Profile.jsx
import React from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileTabs from "../components/profile/ProfileTabs";
import ProfileEditDialog from "../components/profile/ProfileEditDialog";
import { ProfileProvider, useProfile } from "../context/ProfileContext";

function ProfileContent() {
  const { isEditing } = useProfile();

  return (
    <div className="container mx-auto p-6 pt-20 pb-24">
      <ProfileHeader />
      <ProfileInfo />
      <ProfileTabs />
      {isEditing && <ProfileEditDialog />}
    </div>
  );
}

export default function Profile() {
  return (
    <ProfileProvider>
      <ProfileContent />
    </ProfileProvider>
  );
}
