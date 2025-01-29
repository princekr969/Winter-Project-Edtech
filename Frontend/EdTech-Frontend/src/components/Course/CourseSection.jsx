import React from "react";
import CourseCard  from "./CourseCard.jsx";
import { Link } from "react-router-dom";

export default function App() {
  const courses = [
    {
      title: "Brand & Identity Design for Marketers",
      description:
        "Lorem ipsum dolor sit amet, consectetere adipiscing elit. Feugiat feugiat congue viverra facilisis.",
      imageUrl:
        "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      type: "Beginner",
      price: "₹ 399.00",
    },
    {
      title: "Advanced Funnels with Google Analytics",
      description:
        "Lorem ipsum dolor sit amet, consectetere adipiscing elit. Feugiat feugiat congue viverra facilisis.",
      imageUrl:
        "https://mirrorful-production.s3.us-west-1.amazonaws.com/patterns/files/57eb29bc-b31b-4410-abf3-9b57255f60fd/Screenshot_2025-01-27_163208.png",
      type: "Advanced",
      price: "₹ 399.00",
    },
    {
      title: "Landing Page A/B Testing & Conversion Optimization",
      description:
        "Lorem ipsum dolor sit amet, consectetere adipiscing elit. Feugiat feugiat congue viverra facilisis.",
      imageUrl:
        "https://mirrorful-production.s3.us-west-1.amazonaws.com/patterns/files/5f684340-325e-4bef-9645-f5c7d6d032ba/Screenshot_2025-01-27_163046.png",
      type: "Intermediate",
      price: "₹ 399.00",
    },
  ];

  return (
    <div className=" min-h-screen px-5 md:px-16 lg:px-24 py-10 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-[#14142B] md:text-3xl lg:text-4xl font-bold mb-4">
            Everything you need to succeed, all in one place
            </h2>
            <p className="text-[#6E7191] md:text-sm ">
            From essential skills to advanced technical topics, EduMaxi empowers your professional growth every step of the way.
            </p>
          </div>
          <Link to={"./courses"} className="hidden md:block border-2 border-[#4339F2] text-[#4339F2] px-6 py-3 rounded-full hover:bg-[#4339F2] hover:text-white transition-colors">
            ALL COURSES
          </Link>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
        <button className="w-full md:hidden border-2 border-[#4339F2] text-[#4339F2] px-6 py-3 rounded-full mt-6 hover:bg-[#4339F2] hover:text-white transition-colors">
          ALL COURSES
        </button>
      </div>
    </div>
  );
}
