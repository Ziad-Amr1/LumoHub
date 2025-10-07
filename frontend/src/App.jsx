// src/App.jsx
import React, { Suspense, lazy } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

// 🧱 Layout & Components
import Layout from "./layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PageLoadingOverlay from "./components/PageLoadingOverlay";

// 🔔 Toast Notifications
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 💤 Lazy Pages
const Home = lazy(() => import("./pages/home"));
const Profile = lazy(() => import("./pages/profile"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Movies = lazy(() => import("./pages/Movies"));

import { motion } from "framer-motion";

function AnimatedPageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-gray-200">
      <motion.div
        className="w-14 h-14 border-4 border-purple-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        className="mt-4 text-sm tracking-wider text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        Loading...
      </motion.p>
    </div>
  );
}

// ==================== 🌍 App ====================
export default function App() {
  return (
    <>
      {/* Overlay أثناء التنقل */}
      <PageLoadingOverlay />

      <Suspense fallback={<AnimatedPageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/movies"
            element={
              <Layout>
                <Movies />
              </Layout>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <Layout>
                <MovieDetails />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />

          {/* Protected */}
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
      </Suspense>

      {/* Toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        transition={Slide}
      />
    </>
  );
}
