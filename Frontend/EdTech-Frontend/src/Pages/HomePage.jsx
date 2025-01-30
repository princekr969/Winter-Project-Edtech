import React from 'react'
import { useSelector } from 'react-redux'
import { HeroSection, Carousel, CourseSection, AboutSection} from '../components'




function Home() {
  const userDetail = useSelector(state => state.auth.userData);
    console.log("user profile",userDetail)
  return (
    <>  
          <HeroSection/>
          <CourseSection/>
          <AboutSection/>
    </>
  )
}

export default Home
