import React, { useState, useEffect } from 'react';
import {BookOpen, PlayCircle, GraduationCap } from 'lucide-react';
import Module from '../components/Course/Module';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function CourseVideoPlayerPage() {
  const {courseId, lessonId, moduleId} = useParams()
  const [expandedModule, setExpandedModule] = useState(1);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedLesson, setSelectedLesson] = useState({});

  const {courses} = useSelector(state => state.courses);
  const course = courses.filter(course => course.id === courseId)
  const activeModule = course[0].modules.filter(module => module.id === moduleId)
  const activeLesson = activeModule[0].lessons.filter(lesson => lesson.id === lessonId)
  console.log("courses",course)
  console.log("courses_title",course[0].title)
  console.log("module", activeModule)
  console.log("lesson", activeLesson)

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  useEffect(() => {
    setSelectedLesson(activeLesson[0])
    setVideoUrl(activeLesson[0].videoUrl)
    console.log("set",selectedLesson)
    console.log(activeLesson)
    window.scrollTo(0, 0);
    
  }, [activeLesson]);
  
  return (
        <div className="min-h-screen bg-gray-50 mt-24">
          <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">{course[0].title}</h1>
              </div>
          </header>

        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                {videoUrl ? (
                  <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <PlayCircle className="w-20 h-20 text-white opacity-50" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">{selectedLesson.title || "Select a Lesson"}</h2>
                <p className="mt-1 text-sm text-gray-500">Learn the fundamentals and master the concepts step by step</p>
              </div>
            </div>
          </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                    Course Modules
                    </h3>
                </div>
                <div className=" flex gap-2 flex-col p-2 m-2">
                    {course[0].modules.map((module, index) => (
                      <Module module={module} index={index} courseId={courseId}/>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

    
  );
}

export default CourseVideoPlayerPage;


