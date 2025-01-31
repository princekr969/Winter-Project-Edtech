import React from "react";
import { useState, useEffect } from "react";
import CourseCard  from "./CourseCard.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function App() {
  
  const {courses} = useSelector(state => state.courses)
  const [visibleCourses, setVisibleCourses] = useState(3);

  const updateVisibleCourses = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 768 && screenWidth < 1024) {
      setVisibleCourses(4); 
    }else {
      setVisibleCourses(3); 
    }
  };

  useEffect(() => {

    updateVisibleCourses();
    window.addEventListener("resize", updateVisibleCourses);
    return () => window.removeEventListener("resize", updateVisibleCourses);
  }, []);

  return (
    <div className=" px-5 md:px-16 lg:px-24 py-10 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-[#14142B] text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Everything you need to succeed, all in one place
            </h2>
            <p className="text-[#6E7191] md:text-sm ">
            From essential skills to advanced technical topics, EduMaxi empowers your professional growth every step of the way.
            </p>
          </div>
          <Link to={"./courses"} className="hidden md:block border-2 border-[#4339F2] text-[#4339F2] px-6 py-3 rounded-full hover:bg-[#4339F2] hover:text-white transition-colors">
            ALL COURSES
          </Link>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, visibleCourses).map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
        <Link to={"./courses"} className="w-full max-w-fit block md:hidden border-2 border-[#4339F2] text-[#4339F2] px-6 py-3 rounded-full mt-6 hover:bg-[#4339F2] hover:text-white transition-colors">
          ALL COURSES
        </Link>
      </div>
    </div>
  );
}
