import CategoryCarosol from '@/Components/CategoryCarosol'
import Hero from '../Components/Hero'
import React from 'react'
import LatestJobs from '@/Components/LatestJobs'

const HomePage = () => {
  return (
    <div>
      <Hero/>
      <CategoryCarosol/>
      <LatestJobs/>
    </div>
  )
}

export default HomePage