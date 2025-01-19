import React from 'react'

function CourseCard({courseDetail}) {
    
  return (
    <div className="p-3 max-w-80 bg-white border border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
    <img
      className="w-full h-60 rounded-t-lg"
      src={courseDetail.courseImage}
      alt=""    
    />
  </a>
  <div className="pt-2">
    <a href="#">
      <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {courseDetail.courseTitle}
      </h5>
    </a>
    <p className="mb-3 font-light text-gray-700 dark:text-gray-400">
      {courseDetail.mentors}
    </p>

    <p className=''>{courseDetail.courseDescription}</p>
    <hr className='my-2'/>
    <div className=' w-full text-xl font-bold mb-2'>₹{courseDetail.price}</div>
    
    <div className='flex justify-between gap-1'>

        <a
        href="#"
        className="text-blue-700 inline-flex border border-blue-700 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-8 py-3 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
        EXPLORE
        
        </a>
        <a
        href="#"
        className="inline-flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
        ADD TO CART
        
        </a>
    </div>
  </div>
</div>

  )
}

export default CourseCard
