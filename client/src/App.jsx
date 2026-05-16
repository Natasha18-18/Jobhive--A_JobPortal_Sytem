import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import Companies from "./pages/Companies";
import Contact from "./pages/ContactUs";

import EditProfile from "./pages/EditProfile";
import Settings from "./pages/ProfileSetting";
import ChangePassword from "./pages/Password";

// Recruiter Pages
import RecruiterDashboard from "./recruiter/recruiterDashboard";
import UploadJob from "./recruiter/Uploadjob";
import MyJobs from "./recruiter/MyJob";
import Applicants from "./recruiter/Applicant";
import RecruiterProfile from "./recruiter/RecruiterProfile";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/AboutUs";

function App() {
  return (
    <BrowserRouter>

    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/apply-job" element={<ApplyJob />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/contact" element={<Contact />} />
      

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/profile" element={<EditProfile/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/change-password" element={<ChangePassword/>} />

        {/* Recruiters */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/upload-job" element={<UploadJob />} />  
        <Route path="/recruiter/my-jobs" element={<MyJobs />} />
        <Route path="/recruiter/applicants" element={<Applicants />} />
        <Route path="/recruiter/profile" element={<RecruiterProfile />} />

        <Route path="/about" element={<About />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;