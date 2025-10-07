import { useState, useEffect } from "react";

export function useProfile(user) {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "I’m an architecture student who loves design and movies.",
    job: "Architecture Student",
    location: "Cairo, Egypt",
    profilePicture: "",
    coverImage: "",
  });

  const [formData, setFormData] = useState(profile);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // 🔹 تحديث البيانات عند تسجيل الدخول
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        bio: user.bio || prev.bio,
        job: user.job || prev.job,
        location: user.location || prev.location,
        profilePicture: user.avatar || prev.profilePicture,
        coverImage: user.cover || prev.coverImage,
      }));
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, profilePicture: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, coverImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setProfile(formData);
      setOpen(false);
      setLoading(false);
    }, 1200);
  };

  const handleSignOut = () => {
    console.log("Signing out...");
  };

  return {
    profile,
    formData,
    setFormData,
    open,
    setOpen,
    loading,
    handleInputChange,
    handleImageUpload,
    handleCoverUpload,
    handleSubmit,
    handleSignOut,
  };
}
