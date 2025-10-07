// src/components/profile/ProfileHeader.jsx
import React from "react";
import { useProfile } from "../../context/ProfileContext";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Camera, Image as ImageIcon, Palette, Pencil, LogOut } from "lucide-react";

export default function ProfileHeader() {
  const {
    profile,
    isEditing,
    handleBackgroundUpload,
    handleBackgroundChange,
    handleAvatarUpload,
    setIsEditing,
  } = useProfile();

  const defaultGradient = "linear-gradient(135deg, #6D5BBA, #8E54E9)";

  const backgroundStyle = {
    background: profile.background?.includes("url")
      ? `${profile.background} center/cover no-repeat`
      : profile.background || defaultGradient,
    height: "240px",
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  };

  return (
    <div className="relative mb-20">
      {/* 🌈 الخلفية */}
      <div style={backgroundStyle} className="group">
        {/* 🖊️ أزرار الخلفية تظهر فقط أثناء التعديل */}
        {isEditing && (
          <div className="absolute top-4 right-4 flex gap-3 z-10">
            <label className="flex items-center gap-1 bg-white/80 hover:bg-white text-sm px-3 py-1 rounded-full cursor-pointer shadow transition">
              <ImageIcon className="w-4 h-4" />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={() =>
                handleBackgroundChange(
                  "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)"
                )
              }
              className="flex items-center gap-1 bg-white/80 hover:bg-white text-sm px-3 py-1 rounded-full shadow transition"
            >
              <Palette className="w-4 h-4" />
              Use Gradient
            </button>
          </div>
        )}

        {/* ✏️ أزرار تعديل و خروج (ثابتة دايمًا) */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => setIsEditing(true)}
            className="rounded-full shadow"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="rounded-full shadow"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("userProfile");
              window.location.href = "/login";
            }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 🧑‍🎨 الصورة والاسم والسيرة */}
      <div className="absolute -bottom-16 left-10 flex items-center gap-5">
        <div className="relative group">
          <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
            <AvatarImage
              src={profile.avatar || "https://i.pravatar.cc/150?img=3"}
              alt="Profile"
              className="object-cover w-full h-full"
            />
            <AvatarFallback>
              {profile.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "U"}
            </AvatarFallback>
          </Avatar>

          {/* زر تغيير الصورة (يظهر فقط عند التعديل) */}
          {isEditing && (
            <label className="absolute bottom-1 right-1 bg-white/90 p-1.5 rounded-full shadow cursor-pointer hover:scale-110 transition">
              <Camera className="w-4 h-4 text-gray-700" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* الاسم والسيرة الذاتية */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {profile.name || "User Name"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {profile.bio || "Your short bio here..."}
          </p>
        </div>
      </div>
    </div>
  );
}
