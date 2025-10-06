// src/hooks/useProfile.js
import { useState } from "react"

export function useProfile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "I’m an architecture student who loves design and movies.",
    job: "Architecture Student",
    location: "Cairo, Egypt",
    profilePicture: "",
  })

  const [formData, setFormData] = useState(profile)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

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

  return {
    profile,
    formData,
    setFormData,
    open,
    setOpen,
    loading,
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    handleSignOut,
  }
}
