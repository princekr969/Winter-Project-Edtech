import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { HeroSection, CourseSection, AboutSection} from '../components'
import ScrollToTop from '../utils/ScrollButton.jsx';
import courseService from '../services/course.js';
import { initializeCourses } from '../store/coursesSlice.js';



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
