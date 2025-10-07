import React, { useState } from "react";
import { useProfile } from "../../context/ProfileContext";

export default function ProfileEditDialog() {
  const {
    profile,
    formData,
    handleChange,
    handleAvatarUpload,
    handleBackgroundUpload,
    handleSave,
    setIsEditing,
    setFormData,
  } = useProfile();

  const [previewBg, setPreviewBg] = useState(formData.background || profile.background);
  const [previewAvatar, setPreviewAvatar] = useState(formData.avatar || profile.avatar);

  const gradients = [
    "linear-gradient(135deg, #667eea, #764ba2)",
    "linear-gradient(135deg, #ff758c, #ff7eb3)",
    "linear-gradient(135deg, #43cea2, #185a9d)",
    "linear-gradient(135deg, #ff9966, #ff5e62)",
    "linear-gradient(135deg, #00c6ff, #0072ff)",
  ];

  const handleGradientSelect = (gradient) => {
    setPreviewBg(gradient);
    setFormData((prev) => ({ ...prev, background: gradient }));
  };

  const handleBackgroundFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewBg(`url(${url})`);
      handleBackgroundUpload({ target: { files: [file] } });
    }
  };

  const handleAvatarFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewAvatar(url);
      handleAvatarUpload({ target: { files: [file] } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl w-full max-w-lg p-6 shadow-xl relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        {/* 🖼️ معاينة الخلفية */}
        <div
          className="rounded-xl h-40 mb-6 flex items-center justify-center text-white font-medium text-lg shadow-inner"
          style={{
            background: previewBg?.includes("url")
              ? `${previewBg} center/cover no-repeat`
              : previewBg || "linear-gradient(135deg, #667eea, #764ba2)",
          }}
        >
          Background Preview
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 👤 Avatar Preview */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={previewAvatar}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarFile}
              className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-1 rounded-md cursor-pointer"
            />
          </div>

          {/* ✏️ Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            />
          </div>

          {/* 📝 Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 h-24 resize-none"
            />
          </div>

          {/* 🎨 Background Options */}
          <div>
            <label className="block text-sm font-medium mb-2">Background</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {gradients.map((g, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-lg cursor-pointer border-2 ${
                    previewBg === g ? "border-primary" : "border-transparent"
                  }`}
                  style={{ background: g }}
                  onClick={() => handleGradientSelect(g)}
                />
              ))}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundFile}
              className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-1 rounded-md cursor-pointer"
            />
          </div>

          {/* 🔘 Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-dark-primary text-white hover:bg-primary/90 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
