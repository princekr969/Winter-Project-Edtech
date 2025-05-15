import React, { useState, useEffect } from 'react';
import CourseCard from '../Course/CourseCard';
import { Link } from 'react-router-dom';
import Loader from '../../utils/Loader';
import { useSelector } from 'react-redux';
import courseService from '../../services/course';

function CourseList({type}) {
  const [courses, setCourses] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {

      const fetchData = async () => {
        if(userData){
            try {
              let coursesIds = [];

              if(type==='created'){
                coursesIds = [...userData.courses]
              }else{
                coursesIds = [...userData.coursesEnrolled]
              }
              console.log("courseId", coursesIds)
              const createdCourses = await courseService.getCoursesByIds(coursesIds)
              if(createdCourses.success){
                setCourses(createdCourses.data);
              }
              console.log("response", createdCourses)
            } catch (error) {
              console.log('CourseListError', error)
            }
        }
      }
      fetchData();
    }, [userData])
  
  return (courses)?(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <div className='flex flex-col gap-2'>
          <CourseCard key={index} {...course}/>
          {type!=='purchased' ?(
                <Link
                to={`/course/editor/${course.id}`}
                className="w-full py-2 px-2 block bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Edit Course
              </Link>
          ): null}
        </div>
        
      ))}
    </div>
  ):<Loader/>;
}

export default CourseList;
