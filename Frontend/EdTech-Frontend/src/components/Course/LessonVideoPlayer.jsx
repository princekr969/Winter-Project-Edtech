import React, { useState, useContext, createContext, useEffect } from 'react';
import { ChevronDown, ChevronUp, BookOpen, PlayCircle, GraduationCap } from 'lucide-react';
import Module from './Module';
import {ModuleContext, ModuleContextProvider} from '../../Context/ModuleContext.jsx';


const courses = [
    {
      title: "Brand & Identity Design for Marketers",
      description:"Lorem ipsum dolor sit amet, consectetere adipiscing elit. Feugiat feugiat congue viverra facilisis.",
      imageUrl:
        "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      type: "Beginner",
      price: "₹ 399.00",

       modules: [
        {
          id: 1,
          title: "Introduction to Programming",
          lessons: [
            { id: 1, title: "Getting Started", videoUrl: "https://example.com/video1" },
            { id: 2, title: "Basic Concepts", videoUrl: "https://example.com/video2" },
          ]
        },
        {
          id: 2,
          title: "Advanced Topics",
          lessons: [
            { id: 3, title: "Data Structures", videoUrl: "https://example.com/video3" },
            { id: 4, title: "Algorithms", videoUrl: "https://example.com/video4" },
          ]
        }
    ]
    }
    ]

function LessonVideoPlayer() {
    const [expandedModule, setExpandedModule] = useState(1);
    const {selectedLesson} = useContext(ModuleContext);
   
 
  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // This will scroll to the top of the page when it loads
  }, []);
  
  return (
    

        <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
            <GraduationCap className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">EduMaxi Learning Platform</h1>
            </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                    <div className="flex items-center justify-center h-full">
                    <PlayCircle className="w-20 h-20 text-white opacity-50" />
                    </div>  
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedLesson.title}</h2>
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
                <div className="divide-y">
                    {courses[0].modules.map((module, index) => (
                      <Module module={module} index={index}/>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

    
  );
}

export default LessonVideoPlayer;


