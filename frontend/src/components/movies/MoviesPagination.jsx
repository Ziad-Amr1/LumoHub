// src/components/movies/MoviesPagination.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMoviesContext } from "../../context/MoviesContext";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../ui/button";

export default function MoviesPagination() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { page, setPage, totalPages } = useMoviesContext();

  if (totalPages <= 1) return null;

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        className={`${
          isDark ? "hover:bg-dark-bg2/60" : "hover:bg-light-bg2/60"
        }`}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? "default" : "ghost"}
          size="sm"
          onClick={() => goToPage(p)}
          className={`rounded-md ${
            p === page
              ? isDark
                ? "bg-dark-primary text-dark-text"
                : "bg-light-primary text-light-text"
              : isDark
              ? "text-dark-text-secondary hover:bg-dark-bg2/60"
              : "text-light-text-secondary hover:bg-light-bg2/60"
          }`}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
        className={`${
          isDark ? "hover:bg-dark-bg2/60" : "hover:bg-light-bg2/60"
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
