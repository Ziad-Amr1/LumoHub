// src/components/profile/ProfileEditDialog.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { Camera, Loader2 } from "lucide-react"
import { useProfileContext } from "../../context/ProfileContext"

export default function ProfileEditDialog() {
  const {
    formData,
    open,
    setOpen,
    loading,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
  } = useProfileContext()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile details and save changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src={formData.profilePicture || "/placeholder.svg"} />
                <AvatarFallback>
                  {formData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="profile-picture"
                className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Camera className="h-4 w-4 text-primary-foreground" />
              </label>
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Inputs */}
          {["name", "email", "job", "location"].map((field) => (
            <div key={field}>
              <Label htmlFor={field}>{field[0].toUpperCase() + field.slice(1)}</Label>
              <Input
                id={field}
                type={field === "email" ? "email" : "text"}
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                required={["name", "email"].includes(field)}
              />
            </div>
          ))}

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={3}
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
