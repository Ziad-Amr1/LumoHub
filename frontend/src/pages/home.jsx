// src/pages/home.jsx
import Layout from "../layouts/Layout";
import Hero from "../components/hero";
import SearchSection from "../components/search-section";
import FeaturedMovies from "../components/featured-movies";
import MoviesGrid from "../components/MoviesGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchSection />
      <FeaturedMovies />
      <MoviesGrid />
  </>
  );
}
