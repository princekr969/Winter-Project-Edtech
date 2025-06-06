import img from "../../assets/heroimg.svg"

import {Link } from 'react-router-dom'



function HeroSection() {
  return (
        <div className="items-center bg-gradient-to-b from-indigo-50 to-white px-5 md:px-16 lg:px-24 pt-20 sm:pt-24 justify-center lg:flex   ">

          {/* Left Section */}
          <div className="w-full lg:w-1/2" >
            <div className="lg:max-w-xl">
              <h1 className="mb-4 animate-fade-in-down  font-extrabold leading-none tracking-tight text-gray-900  text-5xl dark:text-white">
              Unlock Your Potential  <br /> {" "}
                <span className="text-blue-500">with EduMaxi</span>
              </h1>

              <p className="mt-10 text-base animate-fade-in-up text-gray-600 dark:text-gray-400">
                Discover the power of personalized learning. Our expert instructors provide customized guidance and support, allowing you to learn at your own pace, focus on your areas of strength, and overcome your challenges. Achieve your educational goals with greater efficiency and a deeper understanding
              </p>

              <Link to={"/courses"} className="w-max block max-w-fit animate-fade-in-up text-left px-5 py-2 mt-10 font-semibold text-md tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                Explore <br/>Our Courses
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-end max-lg:hidden animate-slide-in-right justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img
              className="w-full h-full lg:max-w-3xl"
              src={img}
              alt="Catalogue"
            />
          </div>
        </div> 
  )
}

export default HeroSection
