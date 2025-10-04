import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePageLoader } from "../context/PageLoaderContext";

export default function RouteChangeHandler() {
  const location = useLocation();
  const { setLoading } = usePageLoader();

  useEffect(() => {
    // Show overlay immediately
    setLoading(true);

    // Remove overlay بعد التأكد أن الصفحة render
    requestAnimationFrame(() => {
      setLoading(false);
    });
  }, [location.pathname, setLoading]);

  return null;
}
