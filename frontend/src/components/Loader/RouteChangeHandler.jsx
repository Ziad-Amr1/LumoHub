// src/components/RouteChangeHandler.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePageLoader } from "../context/PageLoaderContext.jsx";

export default function RouteChangeHandler() {
  const location = useLocation();
  const { setLoading } = usePageLoader();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // overlay will disappear after 500ms
    return () => clearTimeout(timer);
  }, [location.pathname, setLoading]);

  return null;
}
