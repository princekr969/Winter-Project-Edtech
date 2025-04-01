import React from 'react'
import CourseList from './CourseList'
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function CreatedCourseList() {
  
  const courses = useSelector(state => state.courses.courses)
  const createdCoursesId = useSelector(state => state.auth.userData.purchasedCourses);
  const createdCourseIdSet = new Set(createdCoursesId.map(item => item.id));
  const createdCourses = courses.filter(course => createdCourseIdSet.has(course.id));
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
        <Link
          to={`/course/editor/q1sf2fg`}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Create New Course
        </Link>
      </div>

      <CourseList type={'created'} courses={createdCourses}/>
      
    </div>
  )
}

export default CreatedCourseList
