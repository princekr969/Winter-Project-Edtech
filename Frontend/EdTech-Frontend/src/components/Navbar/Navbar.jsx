import React, { useState } from 'react';
import { Link, NavLink,  } from 'react-router-dom';
import {Cart, UserProfileDropDown} from "../index.js"
import { logout } from '../../store/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [loader, setLoader] = useState(true)
  
  
  const authStatus = useSelector(state => state.auth.status)

  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  
  

  return (
    

    <nav className="bg-white fixed z-20  w-full top-0 start-0 border-b border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* logo and text */}
        <Link to="/" className="flex items-center  rtl:space-x-reverse">
          <img
            src="https://imgs.search.brave.com/Ev0x9E59alL_ahQpdL-Y_FifZ7Yz4dpNbxAVCJUFiGY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9keW5h/bWljLmJyYW5kY3Jv/d2QuY29tL2Fzc2V0/L2xvZ28vODE5OGEy/YWYtNTVmMC00MzI0/LTlmMzYtNjU2NzZh/NWJkY2MyL2xvZ28t/c2VhcmNoLWdyaWQt/MXg_bG9nb1RlbXBs/YXRlVmVyc2lvbj0x/JnY9NjM4NTc5MjQ3/NDAyMjMwMDAw"
            className="h-10"
            alt="EdTech Logo"
          />
          <span className="self-center text-2xl  font-bold whitespace-nowrap dark:text-white">
            EduMaxi
          </span>
        </Link>

 
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        
        {/* Cart */}
        <Cart/>
          

          {/*UserProfile  */}
          {authStatus && <UserProfileDropDown/>}

        {/* Login signup btn */}
          {!authStatus  && <div className='flex gap-2 max-sm:hidden '>
              <Link to={"/user/signin"} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</Link>
              <Link to={"/user/signup"} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</Link>
          </div>}

          

        {/* Small screen links */}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isNavbarOpen}
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        

        {/* Links */}
          <div
            className={`items-center  justify-between ${
              isNavbarOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={({isActive}) => `${(isActive)?"text-blue-700 max-md:bg-gray-100  ": "text-gray-900"} block py-2 px-3   rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:text-blue-500`}
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/courses"
                  className={({isActive}) => `${(isActive)?"text-blue-700 max-md:bg-gray-100  ": "text-gray-900"} block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"

                  className={({isActive}) => `${(isActive)?"text-blue-700 max-md:bg-gray-100  ": "text-gray-900"} block py-2 px-3  rounded hover:bg-gray-100  md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  About
                </NavLink>
              </li>
              
              <li>
                  {!authStatus && <div className='flex sm:hidden justify-center gap-3'>
                    <Link to={"/user/signin"} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</Link>

                    <Link to={"/user/signup"} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</Link>
                </div>}
              </li>
            </ul>
          </div>

      </div>
    </nav>

 
  );
};

export default Navbar;







