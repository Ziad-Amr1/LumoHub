// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // طالما لسه بيحمّل المستخدم من localStorage
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  // بعد التحميل، لو مفيش مستخدم -> ارجعه للـLogin
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // وإلا يعرض الصفحة المحمية
  return children;
}
