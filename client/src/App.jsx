import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoutes";

// =========================
// USER PAGES
// =========================

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import Companies from "./pages/Companies";
import Contact from "./pages/ContactUs";
import About from "./pages/AboutUs";
import Notifications from "./pages/Notification";
import SavedJobs from "./pages/SavedJobs";
import CandidateMessages from "./pages/CandidateMessage";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/ProfileSetting";
import ChangePassword from "./pages/Password";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

// =========================
// RECRUITER PAGES
// =========================

import RecruiterDashboard from "./recruiter/recruiterDashboard";
import UploadJob from "./recruiter/Uploadjob";
import MyJobs from "./recruiter/MyJob";
import Applicants from "./recruiter/Applicant";
import RecruiterProfile from "./recruiter/RecruiterProfile";
import RecruiterNotifications from "./recruiter/RecruiterNotification";
import RecruiterMessages from "./recruiter/RecruiterMessage";
import ApplicantDetails from "./recruiter/ApplicationDetail";
import EditJob from "./recruiter/EditJob";

function App() {

  // =========================
  // GET USER
  // =========================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      <Routes>

        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

        <Route
          path="/"
          element={
            !user ? (
              <Home />
            ) : user.role === "recruiter" ? (
              <Navigate to="/recruiter/dashboard" />
            ) : (
              <Navigate to="/jobs" />
            )
          }
        />

        <Route
          path="/login"
          element={
            user ? (
              user.role === "recruiter" ? (
                <Navigate to="/recruiter/dashboard" />
              ) : (
                <Navigate to="/jobs" />
              )
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/signup"
          element={
            user ? (
              user.role === "recruiter" ? (
                <Navigate to="/recruiter/dashboard" />
              ) : (
                <Navigate to="/jobs" />
              )
            ) : (
              <Signup />
            )
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ========================= */}
        {/* USER ROUTES */}
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
          path="/apply-job/:id"
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

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <CandidateMessages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>
              <SavedJobs />
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
          path="/recruiter/applicants/:id"
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

        <Route
          path="/recruiter/notifications"
          element={
            <ProtectedRoute>
              <RecruiterNotifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/messages"
          element={
            <ProtectedRoute>
              <RecruiterMessages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/applicant/:id"
          element={
            <ProtectedRoute>
              <ApplicantDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/edit-job/:id"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* FOOTER */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;