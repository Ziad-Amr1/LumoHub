// src/layouts/Layout.jsx
import React from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-light-bg1 dark:bg-dark-bg1 text-light-text dark:text-dark-text">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1"> 
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
