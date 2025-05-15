import CourseList from './CourseList'
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader';


function CreatedCourseList() {
  const userData = useSelector(state => state.userData)
  const [courses, setCourses] = useState([]);
  console.log("courses", userData);

  useEffect(() => {
    if(userData){
      setCourses(userData.courses);
      console.log(courses)
    }
  }, [userData])


  return (courses)? (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
        <Link
          to={`/add-new-course`}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Create New Course
        </Link>
      </div>

      <CourseList type={'created'}/>
      
    </div>
  ):<Loader/>
}

export default CreatedCourseList
