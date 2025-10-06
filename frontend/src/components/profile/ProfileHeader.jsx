// src/components/profile/ProfileHeader.jsx
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Pencil, LogOut } from "lucide-react"
import { useProfileContext } from "../../context/ProfileContext"

export default function ProfileHeader() {
  const { profile, setFormData, setOpen, handleSignOut } = useProfileContext()

  return (
    <div className="relative w-full h-48 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
      <div className="absolute top-3 right-3 flex gap-2">
        <Button
          size="icon"
          variant="secondary"
          onClick={() => {
            setFormData(profile)
            setOpen(true)
          }}
          className="rounded-full shadow"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="destructive"
          onClick={handleSignOut}
          className="rounded-full shadow"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute left-6 -bottom-16">
        <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
          <AvatarImage src={profile.profilePicture || "/placeholder.svg"} />
          <AvatarFallback>
            {profile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
