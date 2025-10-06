// src/context/AppProviders.jsx
import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import { PageLoaderProvider } from "./PageLoaderContext";
import { MovieActionsProvider } from "./MovieActionsContext";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PageLoaderProvider>
          <MovieActionsProvider>
            {children}
          </MovieActionsProvider>
        </PageLoaderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
