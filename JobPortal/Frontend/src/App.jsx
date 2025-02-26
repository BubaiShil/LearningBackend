import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import { useAuthStore } from './Store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import Jobs from './Pages/Jobs'

function App() {
  //const [count, setCount] = useState(0)
  const {authCheck,isCheckingAuth,authUser} = useAuthStore()


  useEffect(() => {
    console.log("Running authCheckinapp...");
    authCheck();
  }, [authCheck]); // ✅ Runs only once on mount
  


  if (isCheckingAuth && !authUser) 
    return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
    )
  

  return (
    <>
     
     <div>
      <Navbar/>

      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to='/login'/>}/>
        <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to='/'/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/'/>}/>
        <Route path='/jobs' element={authUser ? <Jobs/> : <Navigate to='/'/>}/>
      </Routes>

      <Toaster/>
     </div>
    </>
  )
}

export default App
