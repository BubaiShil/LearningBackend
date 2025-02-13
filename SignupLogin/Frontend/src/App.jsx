import { useEffect, useState } from 'react'
import './App.css'
import { Toaster } from 'react-hot-toast'
import {Loader} from 'lucide-react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthStore } from './Store/useAuthStore'
import Navbar from './Components/Navbar'
import HomePagee from "./Pages/HomePagee";
import SignupPagee from "./Pages/SignUpPagee";
import LoginPagee from "./Pages/LoginPagee";

function App() {
  const {authUser,checkAuth,ischeckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])


  console.log(authUser);
  

  if (ischeckingAuth && !authUser) 
    return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
    )
  
  

  return (
    <>
     <Toaster position="top-right" />
      <Navbar/>

      <Routes>
        <Route path='/' element={authUser ? <HomePagee/> : <Navigate to='/login'/>}/>
        <Route path='/signup' element={!authUser ? <SignupPagee/> : <Navigate to='/'/>}/>
        <Route path='/login' element={!authUser ? <LoginPagee/> : <Navigate to='/'/>}/>
        {/* <Route path='/' element={<HomePagee/>}/> */}
      </Routes>
    </>
  )
}

export default App
