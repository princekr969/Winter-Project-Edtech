import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie" 
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./services/auth.js"
import {login, logout} from "./store/authSlice"
import { Footer, Navbar } from './components/index.js'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const refreshToken = Cookies.get("refreshToken");
  console.log(refreshToken)

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
        const res = await authService.getCurrentUser(refreshToken)
        console.log("res",res)
        if(res){
          
          dispatch(login(res))
        }else{
          dispatch(logout())
        }
      } catch (error) {
        console.log("refreshToken:",error);
      } finally{
        setLoading(false)
      }
    }
    
    fetchData();
    
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
  ) : Loader()
}

export default App