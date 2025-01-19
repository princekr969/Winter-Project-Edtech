import React from 'react'

function HeroSection() {
  return (
    
    <div className="container py-16 ">
      <div className="items-center w-lvw justify-center  lg:flex mt-28 px-5 md:px-16 lg:px-24 ">
        {/* Left Section */}
        <div className="w-full lg:w-1/2" >
          <div className="lg:max-w-xl">
            <h1 className="mb-4   font-extrabold leading-none tracking-tight text-gray-900  text-5xl dark:text-white">
            Unlock Your Potential. <br /> {" "}
              <span className="text-blue-500">Ignite Your Future</span>
            </h1>

            <p className="mt-10 text-sm text-gray-600 dark:text-gray-400">
              Discover the power of personalized learning. Our expert instructors provide customized guidance and support, allowing you to learn at your own pace, focus on your areas of strength, and overcome your challenges. Achieve your educational goals with greater efficiency and a deeper understanding
            </p>

            <button className="w-max text-left px-5 py-2 mt-10 font-semibold text-md tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
              Explore <br/>Our Courses
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-end max-md:hidden justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <img
            className="w-full h-full lg:max-w-3xl"
            src="https://img.freepik.com/free-vector/hand-drawn-online-tutor-illustration_52683-146749.jpg?t=st=1737255921~exp=1737259521~hmac=613e07b7ba6202cfbbccfb20453fe4cacafa7b17fa887dac8e6a64b8289a9c69&w=1060"
            alt="Catalogue"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
