import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

function Footer() {
  return (
      <footer className="bg-white mx-auto  px-5 md:px-16 lg:px-24">
        <div className="w-full max-w-screen-xl mx-auto py-2 md:py-4">
          <div className="sm:flex sm:items-center sm:justify-between">
            
            <Link
              to="#"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <GraduationCap className="h-8 w-8 text-indigo-600 mr-3" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                EduMaxi
              </span>
            </Link>

            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              
              <li>
                <Link to="/courses" className="hover: me-4 md:me-6">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline ">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} EdTech Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
  
  )
}

export default Footer
