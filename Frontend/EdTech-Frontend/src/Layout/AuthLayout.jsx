import React from 'react'
import { Outlet } from 'react-router-dom'
import image from "./../assets/authimg.svg"

function AuthLayout() {
  return (
   
    <div className='bg-white dark:bg-gray-900'>

      <div className="flex justify-center min-h-screen">
        
        <div className="hidden h-screen animate-slide-in-left lg:block ">
          <img className='w-full h-screen pb-7 pl-6' src={image}
          alt="" />
        </div>
        <Outlet/>
      </div>
    </div>
  )
}

export default AuthLayout
