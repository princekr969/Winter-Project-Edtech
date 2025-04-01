import React, { useEffect, useState } from 'react'
import CourseList from './CourseList'
import { useDispatch, useSelector } from 'react-redux'

// const user = {
//     id: '1',
//     name: 'John Doe',
//     email: 'john@example.com',
//     avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
//     bio: 'Passionate about learning and teaching technology.',
//     purchasedCourses: [
//       {
//         id: '1',
//         title: 'Introduction to React',
//         description: 'Learn the basics of React development',
//         imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
//         price: 49.99,
//         type: "",
//         category: 'cloud',
//         author:{
//           avatar: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//           name:"log",
//         },
//         modules: [
//           {
//             id: '1',
//             title: 'Getting Started',
//             lessons: [
//               { id: '1', title: "Getting Started", videoUrl: "https://youtu.be/RiZL2j5mIPw?si=gPv5meQGQf_cfbNL" },
//             { id: '2', title: "Basic Concepts", videoUrl: "https://youtu.be/RiZL2j5mIPw?si=gPv5meQGQf_cfbNL" },
//             ],
//           },
//         ],
        
//       },
//       { 
//         id:'2',
//         title: "Mastering Digital Marketing",
//         description:
//           "Dive into the world of digital marketing, SEO, content strategy, and advertising.",
//         imageUrl:
//           "https://images.pexels.com/photos/1181336/pexels-photo-1181336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         type: "Intermediate",
//         price: "₹ 899.00",
//         category: 'dsa',
//         author:{
//           avatar: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//           name:"suyash",
//         },
//         modules: [
//           {
//             id: '1',
//             title: "Introduction to Digital Marketing",
//             lessons: [
//               { id: '1', title: "What is Digital Marketing?", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
//               { id: '2', title: "Setting Goals", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
//             ]
//           },
//           {
//             id: '2',
//             title: "SEO and Content Strategy",
//             lessons: [
//               { id: '3', title: "SEO Basics", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
//               { id: '4', title: "Content Planning", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
//             ]
//           }
//         ]
//       },
//     ],
//     createdCourses: [
//       {
//         id: '2',
//         title: 'Advanced JavaScript',
//         description: 'Master JavaScript programming',
//         thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
//         price: 79.99,
//         modules: [
//           {
//             id: '1',
//             title: 'ES6+ Features',
//             lessons: [
//               {
//                 id: '1',
//                 title: 'Arrow Functions',
//                 content: 'Understanding modern JavaScript syntax',
//                 notes: 'Practice exercises included',
//               },
//             ],
//           },
//         ],
//         authorId: '1',
//       },
//     ],
//   };

function PurchasedCoursesList() {
  const courses = useSelector(state => state.courses.courses)
  const purchasedCoursesId = useSelector(state => state.auth.userData.purchasedCourses);
  const purchasedCourseIdSet = new Set(purchasedCoursesId.map(item => item.id));
  
  const purchasedCourses = courses.filter(course => purchasedCourseIdSet.has(course.id));

  return (
    <CourseList type={'purchased'} courses={purchasedCourses}/>
  )
}

export default PurchasedCoursesList
