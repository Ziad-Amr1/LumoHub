// src/pages/home.jsx
import Layout from "../layouts/Layout";
import Hero from "../components/hero";
import SearchSection from "../components/search-section";
import FeaturedMovies from "../components/featured-movies";
import PopularMovies from "../components/PopularMovies";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchSection />
      <FeaturedMovies />
      <PopularMovies />
  </>
  );
}
