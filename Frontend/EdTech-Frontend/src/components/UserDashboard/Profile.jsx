import React, { useState, useEffect } from 'react';
import { Camera, Book, Award, GraduationCap, Briefcase, Calendar, MapPin, Languages, Target, Users, BookOpen, Trophy, Star, Clock } from 'lucide-react';
import avatar from "./../../assets/avatar.svg"
import authService from '../../services/auth';
import {useSelector } from 'react-redux';
import Loader from '../../utils/Loader';

export default function Profile() {

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarUploading, setAvatarUploading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  console.log("Profile", userData)

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  const handleProfileAvatar = async (e) => {
    const img = e.target.files[0];
    // Preview the image
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(img);
    }

    try {
      setAvatarUploading(true);
      const formData = new FormData();
      formData.append("profilePicture", img);
      const userData = await authService.uploadProfilePic(formData)
      console.log(userData);
    } catch (error) {
      console.log(error)
    }finally{
      setAvatarUploading(false)
      window.location.reload(); 
    }
  };

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  useEffect(() => {
    if(userData){
      setFormData(userData);
    }
  }, [userData])

  return (formData)?(
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
  
          <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          
         
          <div className="px-8 pb-8">
         
            <div className="relative -mt-16 mb-8">
              <div className="relative inline-block">
                <img
                  src={formData.profilePicture || avatar}
                  alt={formData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                {editing && (
                  <>
                    <input 
                      type="file" 
                      id="file-upload" 
                      accept="image/*" 
                      onChange={handleProfileAvatar} 
                      className="hidden"
                    />
                    <label 
                      htmlFor="file-upload" 
                      className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 cursor-pointer transition"
                    >
                      {(avatarUploading)?(<svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (<Camera className="w-5 h-5" />)}
                    </label>
                  </>
                )}
              </div>
            </div>

            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium  text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      readOnly
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg bg-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone No.</label>
                    <input
                      type="text"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div> */}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(initialUser);
                      setEditing(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                {/* Basic Info */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">{formData.firstName +" " +  formData.lastName}</h2>
                  {/* <p className="text-indigo-600 font-medium">{formData.role}</p> */}
                  <div className="mt-2 text-gray-600">
                    <span>{formData.email}</span>
                  </div>
                </div>

                {/* Stats */}
                {/* <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{formData.stats.coursesCompleted}</div>
                    <div className="text-sm text-gray-600">Courses Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{formData.stats.coursesCompleted}</div>
                    <div className="text-sm text-gray-600">Enrolled Courses</div>
                  </div>
                  
                </div> */}


                {/* Phone Number */}
                <div className="flex items-center space-x-2">
                  <p className="text-lg font-semibold text-gray-900">Phone No.:</p>
                  <p className="text-gray-600">{formData.phoneNumber}</p>
                </div>
                
                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-600 leading-relaxed">{formData.bio}</p>
                </div>

                {/* Current Courses */}
                {/* <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Current Courses
                  </h3>
                  <div className="space-y-4">
                    {formData.enrolledCourses.map((course, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900">{course.name}</h4>
                          <span className="text-sm text-gray-600">{course.progress}%</span>
                        </div>
                        <ProgressBar progress={course.progress} />
                        <p className="text-sm text-gray-600 mt-2">Instructor: {course.instructor}</p>
                      </div>
                    ))}
                  </div>
                </div> */}


                <div className="flex justify-end">
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ):(<Loader/>);
}