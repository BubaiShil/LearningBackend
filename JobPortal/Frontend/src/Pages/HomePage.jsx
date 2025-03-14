import CategoryCarosol from '@/Components/CategoryCarosol'
import Hero from '../Components/Hero'
import React, { useEffect } from 'react'
import LatestJobs from '@/Components/LatestJobs'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/Store/useAuthStore'

const HomePage = () => {

  const { authUser } = useAuthStore();

  const navigate = useNavigate()

  useEffect(() => {
   if (authUser?.role === 'Recruiter') {
    navigate('/admin/companies')
   }
  }, [])
  

  return (
    <div>
      <Hero/>
      <CategoryCarosol/>
      <LatestJobs/>
    </div>
  )
}

export default HomePage