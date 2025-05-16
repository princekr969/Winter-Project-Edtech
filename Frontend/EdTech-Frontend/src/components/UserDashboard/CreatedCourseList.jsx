import CourseList from './CourseList'
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader';


function CreatedCourseList() {
  const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
        <Link
          to={`/course/edit/${id}`}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Create New Course
        </Link>
      </div>

      <CourseList type={'created'}/>
      
    </div>
  )
}

export default CreatedCourseList
