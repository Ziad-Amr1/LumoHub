import React, { useState } from "react";
import { useMovieActions } from "../../context/MovieActionsContext";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("recent");
  const { recent, favorites, watchLater } = useMovieActions();

  const tabs = [
    { id: "recent", label: "Recently Watched", data: recent },
    { id: "favorites", label: "Favorites", data: favorites },
    { id: "watchLater", label: "Watch Later", data: watchLater },
  ];

  const activeData = tabs.find((tab) => tab.id === activeTab)?.data || [];

  return (
    <div className="mt-6">
      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? "default" : "outline"}
            className="capitalize"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activeData.length > 0 ? (
          activeData.map((movie) => (
            <Card key={movie.id} className="overflow-hidden group">
              <Link to={`/movie/${movie.id}`}>
                <CardContent className="p-0 relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-64 object-cover group-hover:opacity-80 transition"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2 text-sm font-medium">
                    {movie.title}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No movies found.</p>
        )}
      </div>
    </div>
  );
}
