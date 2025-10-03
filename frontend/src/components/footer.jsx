// src/components/footer.jsx
import React from "react";
import { Film } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="flex items-center space-x-2 mb-4">
              <Film className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">CineStream</span>
            </a>
            <p className="text-muted-foreground max-w-md">
              Your ultimate destination for discovering and exploring the latest movies. Stream, rate, and share your
              favorite films with the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/movies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Movies
                </a>
              </li>
              <li>
                <a href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Profile
                </a>
              </li>
              <li>
                <a href="/settings" className="text-muted-foreground hover:text-foreground transition-colors">
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
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
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 CineStream. All rights reserved. Built with React and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
