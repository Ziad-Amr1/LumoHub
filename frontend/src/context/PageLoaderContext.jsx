// src/context/PageLoaderContext.jsx
import React, { createContext, useState, useContext } from "react";

const PageLoaderContext = createContext();

/**
 * Provider to manage page loading overlay on route changes.
 */
export function PageLoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <PageLoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </PageLoaderContext.Provider>
  );
}

/** Hook to use page loader in any component */
export function usePageLoader() {
  return useContext(PageLoaderContext);
}
