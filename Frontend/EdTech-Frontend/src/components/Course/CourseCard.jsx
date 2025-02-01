import React from "react";
import { ShoppingCart, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <div className="relative w-4 h-4">
          <Star className="absolute w-4 h-4 text-yellow-400" />
          <div className="absolute w-2 h-4 overflow-hidden">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
};

const CourseCard = ({
  id = 1,
  title,
  description,
  imageUrl,
  price,
  rating = 3.6,
  author = {
    avatar: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "prince",
  },
}) => {
  return (
    <Link to={`/course/preview/${id}`} className="bg-white rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fadeIn">
      <div className="flex flex-row md:flex-col gap-4 md:gap-0">
        <div className="relative w-1/3 md:w-full aspect-[4/3] bg-[#4339f2] rounded-2xl md:mb-6 flex items-center justify-center shrink-0 group overflow-hidden">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
          <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#4339F2] transition-colors duration-200 group">
            <ShoppingCart className="w-4 h-4 text-[#4339F2] group-hover:text-gray-500 transition-colors duration-200" />
          </button>
        </div>
        <div className="w-2/3 md:w-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#14142B]">{author.name}</span>
              <span className="text-xs text-[#6E7191]">{author.role}</span>
            </div>
          </div>
          <h3 className="text-[#14142B] text-lg md:text-2xl font-semibold mb-2 md:mb-3 hover:text-[#4339F2] transition-colors duration-200">{title}</h3>
          <div className="mb-2">
            <RatingStars rating={rating} />
          </div>
          <p className="text-[#6E7191] text-sm md:text-base mb-3 md:mb-6 overflow-hidden max-h-16 md:max-h-24">{description}</p>
          <div className="flex flex-col gap-3 mt-auto">
            <div className="flex justify-start items-center">
              {/* <div className="flex items-center gap-2 group">
                <div className="w-1 h-4 bg-[#4339F2] transition-all duration-200 group-hover:h-5"></div>
              </div> */}
              <span className="font-semibold text-md md:text-lg">₹ {price}</span>
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
};

export default CourseCard;
