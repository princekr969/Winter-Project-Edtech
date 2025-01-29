import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
      <footer className="bg-white mx-auto rounded-lg shadow dark:bg-gray-900 px-5 md:px-16 lg:px-24">
        <div className="w-full max-w-screen-xl mx-auto py-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            
            {/* EdTech logo */}
            <Link
              to="#"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://imgs.search.brave.com/Ev0x9E59alL_ahQpdL-Y_FifZ7Yz4dpNbxAVCJUFiGY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9keW5h/bWljLmJyYW5kY3Jv/d2QuY29tL2Fzc2V0/L2xvZ28vODE5OGEy/YWYtNTVmMC00MzI0/LTlmMzYtNjU2NzZh/NWJkY2MyL2xvZ28t/c2VhcmNoLWdyaWQt/MXg_bG9nb1RlbXBs/YXRlVmVyc2lvbj0x/JnY9NjM4NTc5MjQ3/NDAyMjMwMDAw"
                className="h-8"
                alt="EdTech Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                EduMaxi
              </span>
            </Link>

            {/* Links */}
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

          {/* Bottom link */}
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} EdTech Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
  
  )
}

export default Footer
