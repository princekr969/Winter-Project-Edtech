import React, { useEffect, useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
} from 'lucide-react';
import authService from '../../services/auth';
import Cookies from "js-cookie" 


function Dashboard() {

  const [user, setUser] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const refreshToken = Cookies.get("refreshToken");

    useEffect(() => {
      const fetchData = async () => {
        
        try {
          const res = await authService.getCurrentUser(refreshToken)
          console.log("Dashboard",res)
          if(res){     
            setUser(res);
            setEnrolledCourses(res.coursesEnrolled)
            setCourses(res.courses);
          }
        } catch (error) {
          console.log("refreshToken:",error);
        }
      }
      
      fetchData();
      
    }, [])
    
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
 
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user.firstName + " " + user.lastName}!</h2>
          <p className="text-gray-600 mt-1">Continue your learning journey today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-xl font-bold text-gray-800">{enrolledCourses.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <GraduationCap className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Courses Created</p>
              <p className="text-xl font-bold text-gray-800">{courses.length}</p>
            </div>
          </div>
        </div>
    
      </div>
    </div>
  );
}

export default Dashboard;