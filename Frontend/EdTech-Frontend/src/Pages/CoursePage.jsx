import React from 'react'
import { Course, CoursePreview, LessonVideoPlayer } from '../components'
import ModuleContextProvider from '../Context/ModuleContextProvider'

function CoursePage() {
  return (
    <div>
      <ModuleContextProvider>
        <CoursePreview/>
      </ModuleContextProvider>
    </div>
  )
}

export default CoursePage
