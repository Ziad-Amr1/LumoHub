// src/context/ProfileContext.jsx
import { createContext, useContext, useState } from "react"
import { useProfile } from "../hooks/useProfile"

const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  const profileData = useProfile()

  // بيانات الأفلام (مؤقتة – ممكن استبدالها بـ API لاحقاً)
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

  const value = {
    ...profileData, // كل ما يخص البروفايل
    recent,
    favorites,
    watchLater,
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useProfileContext() {
  return useContext(ProfileContext)
}
