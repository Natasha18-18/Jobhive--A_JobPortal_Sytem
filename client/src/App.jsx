import {BrowserRouter, Routes, Route,} from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoutes";

// =========================
// PAGES
// =========================

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import Companies from "./pages/Companies";
import Contact from "./pages/ContactUs";
import About from "./pages/AboutUs";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/ProfileSetting";

import ChangePassword from "./pages/Password";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ForgotPassword from "./pages/ForgotPassword";

// =========================
// RECRUITER
// =========================

import RecruiterNavbar from "./recruiter/RecruiterNavbar";
import RecruiterDashboard from "./recruiter/recruiterDashboard";
import UploadJob from "./recruiter/Uploadjob";
import MyJobs from "./recruiter/MyJob";
import Applicants from "./recruiter/Applicant";
import RecruiterProfile from "./recruiter/RecruiterProfile";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ========================= */}
        {/* PROTECTED USER ROUTES */}
        {/* ========================= */}

        <Route
          path="/about"
          element={
            <ProtectedRoute>

              <About />

            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>

              <Jobs />

            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>

              <JobDetail />

            </ProtectedRoute>
          }
        />

        <Route
          path="/apply-job"
          element={
            <ProtectedRoute>

              <ApplyJob />

            </ProtectedRoute>
          }
        />

        <Route
          path="/companies"
          element={
            <ProtectedRoute>

              <Companies />

            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>

              <Contact />

            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>

              <EditProfile />

            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>

              <Settings />

            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>

              <ChangePassword />

            </ProtectedRoute>
          }
        />

        {/* ========================= */}
        {/* RECRUITER ROUTES */}
        {/* ========================= */}

        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute>

              <RecruiterDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/upload-job"
          element={
            <ProtectedRoute>

              <UploadJob />

            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/my-jobs"
          element={
            <ProtectedRoute>

              <MyJobs />

            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/applicants"
          element={
            <ProtectedRoute>

              <Applicants />

            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/profile"
          element={
            <ProtectedRoute>

              <RecruiterProfile />

            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;