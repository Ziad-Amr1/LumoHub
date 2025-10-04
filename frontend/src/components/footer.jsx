// src/components/Footer.jsx
import React from "react";
import { Film, Twitter, Facebook, Instagram, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button"; // shadcn/ui Button
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`bg-card border-t border-border transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Film className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">LumoHub</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Your ultimate destination for discovering and exploring the latest movies. Stream, rate, and share your
              favorite films with the community.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              {[Twitter, Facebook, Instagram].map((Icon, idx) => (
                <a
                  href="#"
                  key={idx}
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors"
                  aria-label="Social Link"
                >
                  <Icon className="h-5 w-5 text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/movies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support + Theme Toggle */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>

            {/* Theme Toggle Button */}
            {/* <div className="mt-6">
              <Button
                size="sm"
                variant="outline"
                onClick={toggleTheme}
                className="flex items-center gap-2"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDark ? "Light Mode" : "Dark Mode"}
              </Button>
            </div> */}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 LumoHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
