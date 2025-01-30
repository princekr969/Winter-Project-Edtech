import React from "react";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CourseCard({
  id=1,
  title,
  description,
  imageUrl,
  type,
  price,
  author={
    avatar: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name:"prin",
  },
}) {
  return (
    <Link to={`/course/preview/${id}`} className="bg-white rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fadeIn">
      <div className="flex flex-row md:flex-col gap-4 md:gap-0">
        
        {/* {course image} */}
        <div className="relative w-1/3 md:w-full aspect-[4/3] bg-[#4339f2] rounded-2xl md:mb-6 flex items-center justify-center shrink-0 group overflow-hidden">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />

          {/* add to cart button */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#4339F2] transition-colors duration-200 group">
            <ShoppingCart className="w-4 h-4 text-[#4339F2] group-hover:text-gray-500 transition-colors duration-200" />
          </button>
        </div>
        
        
        <div className="w-2/3 md:w-full flex flex-col">
        {/* educator */}
          <div className="flex items-center gap-2 mb-3">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#14142B]">
                {author.name}
              </span>
              <span className="text-xs text-[#6E7191]">{author.role}</span>
            </div>
          </div>

          <h3 className="text-[#14142B] text-lg md:text-2xl font-semibold mb-2 md:mb-3 hover:text-[#4339F2] transition-colors duration-200">
            {title}
          </h3>
          <p className="text-[#6E7191] text-sm md:text-base mb-3 md:mb-6 overflow-hidden max-h-16 md:max-h-24">
            {description}
          </p>
          <div className="flex flex-col gap-3 mt-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 group">
                <div className="w-1 h-4 bg-[#4339F2] transition-all duration-200 group-hover:h-5"></div>
                <span className="text-[#6E7191] text-sm md:text-base group-hover:text-[#4339F2] transition-colors duration-200">
                  {type}
                </span>
              </div>
              <span className="font-semibold text-sm md:text-base">
                {price}
              </span>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#4339F2]/10 rounded-full text-[#4339F2] hover:bg-[#4339F2] hover:text-white transition-all duration-300">
              Explore Course
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
