import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie" 
import { useDispatch, useSelector } from 'react-redux'
import './App.css'


import authService from "./services/auth.js"
import {login, logout} from "./store/authSlice.js"
import {initializeEnrolledCourses, initializeCourses} from './store/coursesSlice.js'
import {initializeCart} from './store/cartSlice.js'
import { Footer, Navbar } from './components/index.js'
import { Outlet } from 'react-router-dom'
import cartService from './services/cart.js'
import courseService from './services/course.js';



function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const refreshToken = Cookies.get("refreshToken");
  const isUserActive = useSelector(state => state.auth.status);

 
  const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="relative w-16 h-16">
          <div className="absolute top-4 left-1 w-10 h-5 bg-blue-500 rounded-lg"></div>
          <div className="w-10 h-10 border-6 border-t-6 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-lg text-gray-700">Loading, please wait...</p>
      </div>
    );
  };
  
  useEffect(() => {
    
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const refreshToken = Cookies.get("refreshToken");
        const res = await authService.getCurrentUser(refreshToken)



        if(res.success){    
          dispatch(login(res.message.user))
          const cartItemIds = res.message.user.cartItems;

          // console.log("cartItm", cartItemIds);
          if(cartItemIds.length!==0){
            // console.log("hhell")
            const cartItems = await cartService.getAllUserCartItem(cartItemIds);
            if(cartItems.success){
              
              dispatch(initializeCart(cartItems.data))
            }            
          }

          const courses = await courseService.getAllCourse();
        if(courses.data){
          dispatch(initializeCourses(courses.data))
        }
        console.log("Homepage courses", courses);
          
        
        }else{
          dispatch(logout())
        }
      } catch (error) {
        console.log("refreshToken error:",error);
      } finally{
        setLoading(false)
      }
    }

    const timer = setTimeout(() => {
      fetchData();
    }, 1000); 
    

  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await courseService.getAllCourse();
        if(courses.data){
          dispatch(initializeCourses(courses.data))
        }        
      } catch (error) {
        console.log("HomePageError", error)
      }
    }

    fetchData()
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between '>
      <div className='w-full block'>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <Loader/>
}

export default App
