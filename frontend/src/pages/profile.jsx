import { useState } from "react"
import { Link } from "react-router-dom"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import { Camera, Loader2, LogOut, Pencil } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "I’m an architecture student who loves design and movies.",
    job: "Architecture Student",
    location: "Cairo, Egypt",
    profilePicture: "",
  })

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(profile)

  // Mock data (هنا تقدر تجيب بيانات من API أو DB)
  const [recent] = useState([
    { id: 1, title: "Inception", image: "/placeholder.svg" },
    { id: 2, title: "Interstellar", image: "/placeholder.svg" },
    { id: 3, title: "The Dark Knight", image: "/placeholder.svg" },
  ])
  const [favorites] = useState([
    { id: 4, title: "Shutter Island", image: "/placeholder.svg" },
    { id: 5, title: "The Matrix", image: "/placeholder.svg" },
  ])
  const [watchLater] = useState([
    { id: 6, title: "Dune: Part Two", image: "/placeholder.svg" },
    { id: 7, title: "Oppenheimer", image: "/placeholder.svg" },
  ])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, profilePicture: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setProfile(formData)
      setOpen(false)
      setLoading(false)
    }, 1200)
  }

  const handleSignOut = () => {
    console.log("Signing out...")
  }

  return (
    <div className="container mx-auto p-6 pt-20 pb-24">
      {/* Cover Background */}
      <div className="relative w-full h-48 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => { setFormData(profile); setOpen(true) }}
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

        {/* Avatar */}
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

      {/* User Info */}
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

      {/* Tabs for Media Sections */}
      <div className="max-w-4xl mx-auto mt-10 px-6">
        <Tabs defaultValue="recent">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">Recently Watched</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="later">Watch Later</TabsTrigger>
          </TabsList>

          {/* Recent */}
          <TabsContent value="recent" className="mt-4">
            {recent.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {recent.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="w-36 flex-shrink-0 rounded-lg overflow-hidden shadow bg-muted hover:scale-105 transition-transform"
                  >
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-48 object-cover"
                    />
                    <p className="p-2 text-sm font-medium truncate">{movie.title}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity.</p>
            )}
          </TabsContent>

          {/* Favorites */}
          <TabsContent value="favorites" className="mt-4">
            {favorites.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {favorites.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="w-36 flex-shrink-0 rounded-lg overflow-hidden shadow bg-muted hover:scale-105 transition-transform"
                  >
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-48 object-cover"
                    />
                    <p className="p-2 text-sm font-medium truncate">{movie.title}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No favorites yet.</p>
            )}
          </TabsContent>

          {/* Watch Later */}
          <TabsContent value="later" className="mt-4">
            {watchLater.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {watchLater.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="w-36 flex-shrink-0 rounded-lg overflow-hidden shadow bg-muted hover:scale-105 transition-transform"
                  >
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-48 object-cover"
                    />
                    <p className="p-2 text-sm font-medium truncate">{movie.title}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No watchlist yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
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

            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            {/* Job */}
            <div>
              <Label htmlFor="job">Job Title</Label>
              <Input
                id="job"
                value={formData.job}
                onChange={(e) => handleInputChange("job", e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            {/* Bio */}
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
    </div>
  )
}
