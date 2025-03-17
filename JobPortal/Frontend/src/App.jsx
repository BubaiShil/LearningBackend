import { useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import Jobs from './Pages/Jobs';
import Browse from './Pages/Browse';
import Profile from './Pages/Profile';
import JobDetails from './Pages/JobDetails';
import { useAuthStore } from './Store/useAuthStore';
import { useJobStore } from './Store/useJobStore';
import Company from './Pages/Company';
import CreateCompany from './Pages/CreateCompany';
import CompanyEdit from './Pages/CompanyEdit';
import AdminJobs from './Pages/AdminJobs';

function App() {
  const { authCheck, isCheckingAuth, authUser } = useAuthStore();
  const { getAllJobs } = useJobStore();
  // const { id } = useParams();

  // Run authCheck on component mount
  useEffect(() => {
    console.log("Running authCheck in app...");
    authCheck();
  }, [authCheck]);

  // Re-run authCheck periodically (e.g., every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Re-running authCheck...");
      authCheck();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [authCheck]);

  // Fetch jobs if the user is authenticated
  useEffect(() => {
    if (authUser) {
      getAllJobs();
    }
  }, [authUser, getAllJobs]);

  // Show a loading spinner while checking authentication
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/jobs" element={authUser ? <Jobs /> : <Navigate to="/" />} />
          <Route path="/browser" element={authUser ? <Browse /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />
          <Route path="/JobDetails/:id" element={authUser ? <JobDetails /> : <Navigate to="/" />} />

          <Route path="/admin/companies" element={authUser ? <Company/> : <Navigate to="/" />} />
          <Route path="/admin/jobs/create" element={authUser ? <CreateCompany/> : <Navigate to="/" />} />
          <Route path="/admin/companies-update/:id" element={authUser ? <CompanyEdit/> : <Navigate to="/" />} />
          <Route path="/admin/jobs" element={authUser ? <AdminJobs/> : <Navigate to="/" />} />

        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;