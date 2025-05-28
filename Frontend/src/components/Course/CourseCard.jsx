import React, { useEffect, useState, useRef } from "react";
import { ShoppingCart, ChevronRight, Star, EllipsisVertical, Check } from "lucide-react";
import { Link } from "react-router-dom";
import authService from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import cartService from "../../services/cart";
import {addItem} from "../../store/cartSlice.js"

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
  _id = 1,
  title,
  description,
  imageUrl,
  price,
  rating = 3.6,
  owner='',
  category="",
}) => {
  const [ownerData, setOwnerData] = useState({avatar:"", name:"", email:""});
  const currentUser = useSelector((state) => state.auth.userData?.email);
  const cartItems = useSelector((state) => state.cart?.items)
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const isInCart = (id) =>{
    return cartItems.some(item => item.courseId?.toString() === id.toString())
  }

  const toggleMenu = (e) => {
    e.stopPropagation();
    e.preventDefault(); // prevent <Link> click if inside
    setMenuVisible((prev) => !prev);
  };
  
  const handleAddItem = async (courseId) => {
    console.log("handleAddItem", courseId);
    try {
      const res = await cartService.addItem(courseId)
      if(res.data.success){
        dispatch(addItem(res.data.data));
      }
    } catch (error) {
      console.log("Error in add cart item", error)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authService.getUserById(owner);
        if(userData){
          setOwnerData({
            avatar:userData.message.profilePicture,
            name:`${userData.message.firstName} ${userData.message.lastName}`,
            email:userData.message.email
           })
        }
      } catch (error) {
        console.log("card::userFetch error", error)
      }
    }

    if(owner){
      fetchData();
    }
  }, [])


  return (
    <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fadeIn">
      <div className="flex flex-row md:flex-col gap-4 md:gap-0">
        <div className="relative w-1/3 md:w-full aspect-[4/3] bg-[#4339f2] rounded-2xl md:mb-6 flex items-center justify-center shrink-0 group overflow-hidden">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
          {(ownerData.email===currentUser)?
          <button ref={buttonRef} onClick={toggleMenu} className="absolute max-md:hidden top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-125 shadow-md hover:bg-slate-200 hover:transition-transform transition-colors duration-200">
            <EllipsisVertical className="w-4 h-4 text-[#4339F2] transition-colors hover:scale-125 duration-200" />
            </button>
            :<div>
              {!(isInCart(_id))?
              <button onClick={() => handleAddItem(_id)} className="absolute max-md:hidden top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-125 shadow-md hover:bg-slate-200 hover:transition-transform transition-colors duration-200">
                  
                <ShoppingCart className="w-4 h-4 text-[#4339F2] hover:scale-125 transition-colors duration-200" />
              </button>:
              <button className="absolute max-md:hidden top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-125 shadow-md hover:bg-slate-200 hover:transition-transform transition-colors duration-200">
  
                <Check className="w-4 h-4 text-[#4339F2] hover:scale-125 transition-colors duration-200" />
              </button>
              }
            </div>

          }
        </div>
        {(menuVisible && ownerData.email===currentUser)?
        (
          <div
          ref={menuRef}
          className="absolute top-[38px] right-8 md:top-[72px] md:right-12 z-20 bg-white border shadow-md rounded-md w-32 text-sm"
        >
          <Link
            to={`/course/edit/${_id}`}
            className="block p-2 rounded hover:bg-gray-100"
          >
            Edit Course
          </Link>
          <Link
            to={`/course/module/edit/${_id}`}
            className="block p-2 rounded hover:bg-gray-100"
          >
            Edit Modules
          </Link>
        </div>
        )
        :null}
        <div className="w-2/3 md:w-full flex flex-col">
        {(currentUser===ownerData.email)?
        <button ref={buttonRef} onClick={toggleMenu} className="absolute md:hidden top-3 right-3 w-8 h-8 bg-white flex items-center justify-center hover:scale-125 transition-colors duration-200 group">
            <EllipsisVertical className="w-4 h-4 text-[#4339F2] transition-colors hover:scale-125 duration-200" />
        </button>:
        <button onClick={() => handleAddItem(_id)} className="absolute md:hidden top-3 right-3 w-8 h-8 bg-white flex items-center justify-center hover:scale-125 transition-colors duration-200 group">
          {(cartItems.find(item => item.courseId === _id) === undefined)?
            <ShoppingCart className="w-4 h-4 text-[#4339F2] hover:scale-125 transition-colors duration-200" />:
            <Check className="w-4 h-4 text-[#4339F2] hover:scale-125 transition-colors duration-200" />
            }
        </button>
        }
          <div className="flex items-center gap-2 mb-3">
            <img src={ownerData.avatar} alt={ownerData.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#14142B]">{ownerData.name}</span>
              <span className="text-xs text-[#6E7191]">{category}</span>
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
            <Link to={`/course/preview/${_id}`} className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#4339F2]/10 rounded-full text-[#4339F2] hover:bg-[#4339F2] hover:text-white transition-all duration-300">
              Explore Course
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
