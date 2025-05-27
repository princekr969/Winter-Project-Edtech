import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { HeroSection, CourseSection, AboutSection} from '../components'
import ScrollToTop from '../utils/scrollButton.jsx';
import courseService from '../services/course.js';
import { initializeCourses } from '../store/coursesSlice.js';


function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await courseService.getAllCourse();
        if(courses.data){
          dispatch(initializeCourses(courses.data))
        }
        console.log("Homepage courses", courses);
        
      } catch (error) {
        console.log("HomePageError", error)
      }
    }

    fetchData()
  }, [])
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
