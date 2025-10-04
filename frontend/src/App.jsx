import React from "react";
import "./App.css";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import Layout from "./layouts/Layout";
import MovieDetails from "./pages/MovieDetails";
import AllMovies from "./pages/AllMovies";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PageLoaderProvider } from "./context/PageLoaderContext.jsx";
import LoaderOverlay from "./components/LoaderOverlay";
import RouteChangeHandler from "./components/RouteChangeHandler";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PageLoaderProvider>
          <Router>
            <LoaderOverlay />
            <RouteChangeHandler />
            <Routes>
              {/* Home page */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />

              {/* Movie Details */}
              <Route
                path="/movie/:id"
                element={
                  <Layout>
                    <MovieDetails />
                  </Layout>
                }
              />

              {/* All Movies */}
              <Route
                path="/movies"
                element={
                  <Layout>
                    <AllMovies />
                  </Layout>
                }
              />

              {/* Login page */}
              <Route
                path="/login"
                element={
                  <Layout>
                    <Login />
                  </Layout>
                }
              />

              {/* Register page */}
              <Route
                path="/register"
                element={
                  <Layout>
                    <Register />
                  </Layout>
                }
              />

              {/* Profile */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </PageLoaderProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
