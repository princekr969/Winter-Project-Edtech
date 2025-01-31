import React, { useState } from 'react';
import { Book, Clock, DollarSign } from 'lucide-react';
import CourseCard from '../Course/CourseCard';

const user = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
    bio: 'Passionate about learning and teaching technology.',
    purchasedCourses: [
      {
        id: '1',
        title: 'Introduction to React',
        description: 'Learn the basics of React development',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        price: 49.99,
        type: "",
        category: 'cloud',
        author:{
          avatar: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          name:"log",
        },
        modules: [
          {
            id: 1,
            title: 'Getting Started',
            lessons: [
              { id: 1, title: "Getting Started", videoUrl: "https://youtu.be/RiZL2j5mIPw?si=gPv5meQGQf_cfbNL" },
            { id: 2, title: "Basic Concepts", videoUrl: "https://youtu.be/RiZL2j5mIPw?si=gPv5meQGQf_cfbNL" },
            ],
          },
        ],
        
      },
      { 
        id:2,
        title: "Mastering Digital Marketing",
        description:
          "Dive into the world of digital marketing, SEO, content strategy, and advertising.",
        imageUrl:
          "https://images.pexels.com/photos/1181336/pexels-photo-1181336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        type: "Intermediate",
        price: "₹ 899.00",
        category: 'dsa',
        author:{
          avatar: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          name:"suyash",
        },
        modules: [
          {
            id: 1,
            title: "Introduction to Digital Marketing",
            lessons: [
              { id: 1, title: "What is Digital Marketing?", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
              { id: 2, title: "Setting Goals", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
            ]
          },
          {
            id: 2,
            title: "SEO and Content Strategy",
            lessons: [
              { id: 3, title: "SEO Basics", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
              { id: 4, title: "Content Planning", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
            ]
          }
        ]
      },
    ],
    createdCourses: [
      {
        id: '2',
        title: 'Advanced JavaScript',
        description: 'Master JavaScript programming',
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
        price: 79.99,
        modules: [
          {
            id: '1',
            title: 'ES6+ Features',
            lessons: [
              {
                id: '1',
                title: 'Arrow Functions',
                content: 'Understanding modern JavaScript syntax',
                notes: 'Practice exercises included',
              },
            ],
          },
        ],
        authorId: '1',
      },
    ],
  };

function CourseList({type, onEditCourse }) {
    const [courses, setCourses] = useState(user.purchasedCourses)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        // <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
        //   <img
        //     src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800'}
        //     alt={course.title}
        //     className="w-full h-48 object-cover"
        //   />
        //   <div className="p-4">
        //     <h3 className="text-lg font-semibold text-gray-800 mb-2">
        //       {course.title}
        //     </h3>
        //     <p className="text-gray-600 text-sm mb-4">{course.description}</p>

        //     <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        //       <div className="flex items-center gap-1">
        //         <Book className="w-4 h-4" />
        //         <span>{course.modules.length} modules</span>
        //       </div>
        //       <div className="flex items-center gap-1">
        //         <Clock className="w-4 h-4" />
        //         <span>
        //           {course.modules.reduce(
        //             (acc, module) => acc + module.lessons.length,
        //             0
        //           )}{' '}
        //           lessons
        //         </span>
        //       </div>
        //       <div className="flex items-center gap-1">
        //         <DollarSign className="w-4 h-4" />
        //         <span>${course.price}</span>
        //       </div>
        //     </div>

        //     {type === 'purchased' ? (
        //       <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
        //         Continue Learning
        //       </button>
        //     ) : (
        //       <button
        //         onClick={() => onEditCourse?.(course)}
        //         className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        //       >
        //         Edit Course
        //       </button>
        //     )}
        //   </div>
        // </div>
        <div className='flex flex-col gap-2'>

          <CourseCard key={index} {...course}/>
          {type==='purchased' ? (
            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Continue Learning
            </button>
          ):(
                <button
                onClick={() => onEditCourse?.(course)}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Edit Course
              </button>
          )}
        </div>
        
      ))}
    </div>
  );
}

export default CourseList;
