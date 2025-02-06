import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

//import "./App.css";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import SettingsPage from "./Pages/SettingsPage";
import ProfilePage from "./Pages/ProfilePage";
import Navbar from "./Components/Navbar";
import {Loader} from 'lucide-react'
import { useAuthStore } from "./Store/useAuthStore.js";
import { useThemeStore } from "./Store/useThemeStore.js";
import { Toaster } from "react-hot-toast";

function App() {
  //const [count, setCount] = useState(0);

  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const {theme} = useThemeStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) 
    return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
    )
  

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to='/login'/>} />
        <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to='/'/>} />
        <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to='/'/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to='/login'/>} />
      </Routes>

      <Toaster/>
    </div>
  );
}

export default App;
