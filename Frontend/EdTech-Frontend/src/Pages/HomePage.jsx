import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { HeroSection, CourseSection, AboutSection} from '../components'




function Home() {
  
  
  useEffect(() => {
    window.scrollTo(0,0); // This will scroll to the top of the page when it loads
  }, []);  
  return (
    <>  
          <HeroSection/>
          <CourseSection/>
          <AboutSection/>
    </>
  )
}

export default Home
