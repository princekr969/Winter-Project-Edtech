import React, { useState } from 'react'

function UserProfileDropDown({userDetail, setUserDetail}) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen((prev) => !prev);
    };
    
    const closeDropdown = () => {
      setIsOpen(false);
    };

    const handleSignout = (currentStatus) => {
        setUserDetail({...userDetail, loginStatus:false})
    }

    
  return (
    <div className="relative inline-block">

    {/* Dropdown toggle button */}
     <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            onClick={toggleDropdown}
            >
            <span className="sr-only">Open user menu</span>
            <img
                className="w-8 h-8 rounded-full"
                src="https://images.pexels.com/photos/30162929/pexels-photo-30162929/free-photo-of-dramatic-portrait-of-woman-in-leather-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="user photo"
            />
            </button>

    {/* Dropdown menu */}
    {isOpen && (
      <div
        onClick={closeDropdown}
        className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
      >
        <a
          href="#"
          className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <img
            className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
            src="https://images.pexels.com/photos/30162929/pexels-photo-30162929/free-photo-of-dramatic-portrait-of-woman-in-leather-jacket.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt={userDetail.name}
          />
          <div className="mx-1">
            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {userDetail.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userDetail.email}
            </p>
          </div>
        </a>

        <hr className="border-gray-200 dark:border-gray-700" />

        <a
          href="#"
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          View profile
        </a>

        <a
          href="#"
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Settings
        </a>

        <hr className="border-gray-200 dark:border-gray-700" />


       

        <hr className="border-gray-200 dark:border-gray-700" />

        <a
          href="#"
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Help
        </a>
        <a
          href="#"
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => handleSignout(userDetail.loginStatus)}
        >
          Sign Out
        </a>
      </div>
    )}
  </div>
  )
}

export default UserProfileDropDown
