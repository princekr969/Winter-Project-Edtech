import React, { useState, useEffect } from 'react';
import { Users2, Star, BookOpen, } from 'lucide-react';
import { useSelector } from 'react-redux';
import { CourseCard } from '../components';
import {CourseHeroSection} from '../components';
import ScrollToTop from '../utils/scrollButton';

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'web-dev', name: 'Web Development' },
  { id: 'dsa', name: 'Data Structures & Algorithms' },
  { id: 'ml', name: 'Machine Learning' },
  { id: 'mobile', name: 'Mobile Development' },
  { id: 'cloud', name: 'Cloud Computing' },
];


function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCourses, setVisibleCourses] = useState(6);
  const {courses} = useSelector(state => state.courses)
  const courseSectionId = "mainCourseContent"

  console.log("course-page",courses)

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  const handleLoadMore = () => {
    setVisibleCourses(prev => Math.min(prev + 3, filteredCourses.length));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <div>
      <CourseHeroSection id={courseSectionId}/>
    
      <div id={courseSectionId}  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-5">
      
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Our Courses</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setVisibleCourses(3); // Reset visible courses when changing category
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.slice(0, visibleCourses).map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Load More Button */}
        {filteredCourses.length > visibleCourses && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Load More Courses
            </button>
          </div>
        )}
      </div>
    </div>
    <ScrollToTop/>
    </>
  );
}

export default CoursesPage;
