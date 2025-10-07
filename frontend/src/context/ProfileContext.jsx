import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth();

  // ✅ تحميل بيانات البروفايل من localStorage أو بيانات افتراضية
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Angel",
          bio: "Creative Architect 🌸",
          email: "angel@example.com",
          job: "Architecture Student",
          location: "Cairo, Egypt",
          avatar: "https://i.pravatar.cc/150?img=3",
          background: "linear-gradient(135deg, #6D5BBA, #8E54E9)",
        };
  });

  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ تحديث formData لما يتغير profile
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  // ✅ حفظ تلقائي للبروفايل في localStorage عند تغييره
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  // ✅ مزامنة بيانات المستخدم (عند تسجيل الدخول)
  useEffect(() => {
    const hasProfile = localStorage.getItem("userProfile");
    if (user && !hasProfile) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || prev.name,
        bio: user.bio || prev.bio,
        avatar: user.avatar || prev.avatar,
        background: user.cover || prev.background,
      }));
    }
  }, [user]);

  // ✏️ تعديل النصوص
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🖼️ رفع صورة البروفايل (Avatar)
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, avatar: imageUrl }));
  };

  // 🌅 رفع خلفية كصورة
  const handleBackgroundUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, background: `url(${imageUrl})` }));
  };

  // 🎨 تغيير الخلفية إلى تدرج
  const handleBackgroundChange = (gradient) => {
    setFormData((prev) => ({ ...prev, background: gradient }));
  };

  // 💾 حفظ التعديلات
  const handleSave = () => {
    setProfile(formData);
    localStorage.setItem("userProfile", JSON.stringify(formData)); // تأكيد الحفظ
    setIsEditing(false);
  };

  // ❌ إلغاء التعديلات
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        formData,
        isEditing,
        setIsEditing,
        handleChange,
        handleAvatarUpload,
        handleBackgroundUpload,
        handleBackgroundChange,
        handleSave,
        handleCancel,
        setFormData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
