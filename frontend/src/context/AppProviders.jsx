// src/context/AppProviders.jsx
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { PageLoaderProvider } from "./PageLoaderContext";
import { MovieActionsProvider } from "./MovieActionsContext";
import { ProfileProvider } from "./ProfileContext";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PageLoaderProvider>
          <MovieActionsProvider>
            <ProfileProvider>
              {children}
            </ProfileProvider>
          </MovieActionsProvider>
        </PageLoaderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
