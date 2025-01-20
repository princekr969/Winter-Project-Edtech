import React, { useEffect, useState } from 'react'
import {CourseCard} from "../index.js"
import { use } from 'react'

function CourseSection() {
    const [courseDetails, setCourseDetails] = useState(Array({
        courseTitle: "Data Science",
                courseDescription: "World Best course",
                mentors: "Prince",
                price: 2000,
                courseImage:"https://images.pexels.com/photos/30222913/pexels-photo-30222913/free-photo-of-young-woman-in-cozy-scarf-and-headphones-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }))

    


  return (
    <>
        <section className="bg-white border-gray-200 dark:bg-gray-900 px-5 md:px-16 lg:px-24">
            <div className="  mx-auto max-w-screen-xl mb-9 ">
                <h3 className='mb-4 max-w-full text-4xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white'>All the skills you need in one place</h3>
                <p className='text-md md:text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>From critical skills to technical topics, EdTech supports your professional development.</p>
            </div>
            <div className=" dark:bg-gray-700">
            <div className="max-w-screen-xl  mx-auto">
                <div className="flex items-center">
                <ul className="flex flex-row font-medium mb-2 space-x-8 rtl:space-x-reverse text-md">
                    <li>
                    <a href="#" className="text-gray-900 pb-2 dark:text-white hover:border-b-2 hover:border-black" aria-current="page">Data Science</a>
                    </li>
                    <li>
                    <a href="#" className="text-gray-900 pb-2  hover:border-b-2 hover:border-black dark:text-white ">Web Development</a>
                    </li>
                    <li>
                    <a href="#" className="text-gray-900 pb-2  hover:border-b-2 hover:border-black dark:text-white ">Deep Learning</a>
                    </li>
                    <li>
                    <a href="#" className="text-gray-900 pb-2 hover:border-b-2 hover:border-black dark:text-white ">Artificial Intelligence</a>
                    </li>
                </ul>
                </div>
            </div>
            </div>

        </section>

        <div className='bg-gray-100 flex gap-2 py-5 px-5 md:px-16 lg:px-24'>
            {
                courseDetails.map((courseDetail,index) => (
                    <CourseCard key={index} courseDetail={courseDetail}/>
                ))
            }
            
        </div>
        

    </>
  )
}

export default CourseSection
