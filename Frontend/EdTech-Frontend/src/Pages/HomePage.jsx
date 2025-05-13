import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { HeroSection, CourseSection, AboutSection} from '../components'
import ScrollToTop from '../utils/scrollButton';


function Home() {
  
  return (
    <>  
          <HeroSection/>
          <CourseSection/>
          <AboutSection/>
          <ScrollToTop/>
    </>
  )
}

export default Home
