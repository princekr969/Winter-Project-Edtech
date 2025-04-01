import React, { useState } from 'react';
import CourseCard from '../Course/CourseCard';
import { Link } from 'react-router-dom';

function CourseList({courses, type}) {
  
  return (
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
  );
}

export default CourseList;
