import React from 'react'
import { Course, CoursePreview, LessonVideoPlayer } from '../components'
import {ModuleContextProvider} from '../Context/ModuleContext'
import { Outlet } from 'react-router-dom'

function CoursePage() {
  return (
      <Course/>
  )
}

export default CoursePage
