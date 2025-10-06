// src/pages/profile.jsx
import ProfileHeader from "../components/profile/ProfileHeader"
import ProfileInfo from "../components/profile/ProfileInfo"
import ProfileTabs from "../components/profile/ProfileTabs"
import ProfileEditDialog from "../components/profile/ProfileEditDialog"
import { ProfileProvider } from "../context/ProfileContext"

export default function profile() {
  return (
    <ProfileProvider>
      <div className="container mx-auto p-6 pt-20 pb-24">
        <ProfileHeader />
        <ProfileInfo />
        <ProfileTabs />
        <ProfileEditDialog />
      </div>
    </ProfileProvider>
  )
}
