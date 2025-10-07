import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🕓 حالة تحميل المستخدم

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false); // انتهى التحميل ✅
  }, []);

  const login = (email, password) => {
    if (email === "admin@test.com" && password === "12345678") {
      const userData = {
        name: "Admin User",
        email,
        bio: "Architecture student passionate about design and creativity.",
        job: "Architecture Student",
        location: "Cairo, Egypt",
        avatar: "https://pin.it/4nPleVeSd",
        cover:
          "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
