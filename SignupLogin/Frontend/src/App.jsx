import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useAuthStore } from './Store/useAuthStore'
import Navbar from './Components/Navbar'
import HomePagee from "./Pages/HomePagee";
import SignupPagee from "./Pages/SignUpPagee";
import LoginPagee from "./Pages/LoginPagee";

function App() {
  const [count, setCount] = useState(0)
  const {authUser,checkAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])


  console.log(authUser);
  

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path='/' element={<HomePagee/>}/>
        <Route path='/signup' element={<SignupPagee/>}/>
        <Route path='/login' element={<LoginPagee/>}/>
        {/* <Route path='/' element={<HomePagee/>}/> */}
      </Routes>
    </>
  )
}

export default App
