import React, { useState, useEffect, useRef } from 'react'
import { logout } from '../../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../services/auth';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import avatar from "./..//../assets/avatar.svg"


function UserProfileDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const userDetail = useSelector(state => state.auth.userData);

  const dispatch = useDispatch()

  const handleSignout = async () => {
    try {
      const res = await authService.logout();
      console.log("logout:",res);
      dispatch(logout())
      navigate("/")
    } catch (error) {
      console.log("sign out :: error ::",error)
    }
  
  };
  
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  
  const closeDropdown = () => {
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
    
  useEffect(() => {
      const handleScroll = () => setIsOpen(false);
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  useEffect(() => {
      setIsOpen(false);
    }, [location])

    
  return (
    <div className="relative inline-block">

    {/* Dropdown toggle button */}
     <button
            type="button"
            className="flex text-sm bg-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            onClick={toggleDropdown}
            >
            <span className="sr-only">Open user menu</span>
            <img
                className="w-8 h-8 rounded-full"
                src={userDetail.avatar || avatar}
                alt="user photo"
            />
      </button>

    {/* Dropdown menu */}
    {isOpen && (
      <div
        ref={dropdownRef}
        onClick={closeDropdown}
        className="absolute right-0 z-50 top-14 w-56 mt-2 overflow-hidden bg-white rounded-md shadow-xl border-gray-200"
      >
        <Link
          to={"/user/dashboard"}
          className="flex items-center p-4 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <img
            className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
            src={userDetail.avatar || avatar}
            alt={userDetail.firstName + userDetail.lastName}
          />
          <div className="mx-1">
            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {userDetail.firstName +" " + userDetail.lastName}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userDetail.email}
            </p>
          </div>
        </Link>

        <hr className="border-gray-200 dark:border-gray-700" />
        <hr className="border-gray-200 dark:border-gray-700" />

        <NavLink
          to={"/user/profile"}
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          View profile
        </NavLink>
        <NavLink
          to={"/cart"}
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          My cart
        </NavLink>

        <hr className="border-gray-200 dark:border-gray-700" />
        <hr className="border-gray-200 dark:border-gray-700" />
        <NavLink
          to={"/user/purchased"}
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Subscriptions
        </NavLink>
        <NavLink
          to={"/user/created"}
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          My Courses
        </NavLink>
        <hr className="border-gray-200 dark:border-gray-700" />
        <hr className="border-gray-200 dark:border-gray-700" />
        <a
          href="#"
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Settings
        </a>

        <a
          href="#"
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Help
        </a>
        <a
          href="#"
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={handleSignout}
        >
          Sign Out
        </a>
      </div>
    )}
  </div>
  )
}

export default UserProfileDropDown
