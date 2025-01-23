import React from 'react'
import { useSelector } from 'react-redux'
import { HeroSection, Carousel, CourseSection } from '../components'




function Home() {
  const userDetail = useSelector(state => state.auth.userData);
    console.log("user profile",userDetail)
  return (
    <>  
        {/* <Carousel/> */}
        <HeroSection/>
        <CourseSection/>
       
    </>
  )
}

export default Home
