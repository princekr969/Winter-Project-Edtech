import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  Globe,
  PlayCircle,
  Star,
  Trophy,
  Users2,
} from "lucide-react";
import {Module} from "./../index.js" 

const CoursePreview = () => {
  
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

  return (
    <div className="min-h-screen bg-gray-50 mt-26">
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <div className="absolute inset-0">
          <img
            src={courses[0].imageUrl}
            alt="Course hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              Professional Certificate
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {courses[0].title}
            </h1>
            <p className="mt-6 text-xl text-gray-100 max-w-3xl">
              {courses[0].description}
            </p>
          </div>
        </div>
      </div>

      {/* Course Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold">12 Weeks</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Globe className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Level</p>
              <p className="font-semibold">Intermediate</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users2 className="w-6 h-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Students</p>
              <p className="font-semibold">2,500+ Enrolled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Course Overview */}
            <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
              <p className="text-gray-600 mb-6">
                {courses[0].description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <BookOpen className="w-5 h-5" />, text: "24 Modules" },
                  { icon: <PlayCircle className="w-5 h-5" />, text: "120+ Video Lessons" },
                  { icon: <Trophy className="w-5 h-5" />, text: "Certificate of Completion" },
                  { icon: <Star className="w-5 h-5" />, text: "Project-Based Learning" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-700">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Curriculum</h2>
              <div className="space-y-4">
                {courses[0].modules.map((module, index) => (
                 <Module module={module} index={index}/>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Course Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-blue-600">{courses[0].price}</div>
                <p className="text-gray-500 mt-2">One-time payment</p>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4">
                Enroll Now
              </button>
              <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Try Free Demo
              </button>
              <div className="mt-6 space-y-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <PlayCircle className="w-5 h-5 text-green-500" />
                  <span>Lifetime Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-green-500" />
                  <span>Certificate of Completion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users2 className="w-5 h-5 text-green-500" />
                  <span>Community Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
