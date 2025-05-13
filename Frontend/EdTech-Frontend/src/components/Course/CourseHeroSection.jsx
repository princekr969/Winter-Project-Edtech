import { ArrowRight, BookOpen, GraduationCap, Users } from 'lucide-react'
import React from 'react'


function CourseHeroSection({id}) {
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      };

  return (
    <div className=" bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[length:20px_20px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Unlock Your Potential with
              <span className="text-indigo-600 block mt-2">Expert-Led Courses</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your future with our comprehensive online courses. Learn from industry experts and join a community of lifelong learners.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection(id)}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3">
                  <div className="font-bold text-2xl text-gray-900">200+</div>
                  <div className="text-gray-600">Expert Courses</div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3">
                  <div className="font-bold text-2xl text-gray-900">50K+</div>
                  <div className="text-gray-600">Active Students</div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="mt-3">
                  <div className="font-bold text-2xl text-gray-900">98%</div>
                  <div className="text-gray-600">Completion Rate</div>
                </div>
              </div>
            </div> */}
          </div>

        </div>
      </div>
    </div>
  
  )
}

export default CourseHeroSection
