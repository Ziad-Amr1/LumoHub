// src/components/CustomToast.jsx
import { Heart, Bookmark, Eye, Share2 } from "lucide-react"

export const CustomToast = ({ type, message }) => {
  let icon, bgColor

  switch (type) {
    case "favorite":
      icon = <Heart className="w-5 h-5 text-red-500" />
      bgColor = "bg-gray-800"
      break
    case "watchlist":
      icon = <Bookmark className="w-5 h-5 text-yellow-400" />
      bgColor = "bg-gray-800"
      break
    case "watched":
      icon = <Eye className="w-5 h-5 text-green-400" />
      bgColor = "bg-gray-800"
      break
    case "share":
      icon = <Share2 className="w-5 h-5 text-blue-400" />
      bgColor = "bg-gray-800"
      break
    default:
      icon = null
      bgColor = "bg-gray-800"
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${bgColor} text-white shadow-lg`}>
      {icon}
      <span className="text-sm">{message}</span>
    </div>
  )
}
