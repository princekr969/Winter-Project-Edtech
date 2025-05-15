import { useEffect, useState } from 'react';
import { BookOpen, GraduationCap} from 'lucide-react';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader';


function Dashboard() {

  const [user, setUser] = useState({});
  const userData = useSelector((state) => state.auth.userData)
  
  useEffect(() => {
    if(userData){
      setUser(userData);
      console.log("dashboard", userData)
    }
  }, [userData])
    
  return (user)?(
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
              <p className="text-xl font-bold text-gray-800">{user.coursesEnrolled?.length}</p>
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
              <p className="text-xl font-bold text-gray-800">{user.courses?.length}</p>
            </div>
          </div>
        </div>
    
      </div>
    </div>
  ):(<Loader/>);
}

export default Dashboard;