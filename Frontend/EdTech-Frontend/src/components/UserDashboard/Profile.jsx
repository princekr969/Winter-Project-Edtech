import React, { useState } from 'react';
import { Camera, Book, Award, GraduationCap, Briefcase, Calendar, MapPin, Languages, Target, Users, BookOpen, Trophy, Star, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Profile() {

  const user = useSelector(state => state.auth.userData);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  const handleProfileAvatar = (e) => {
    const img = e.target.files[0];
    // Preview the image
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(img);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
  
          <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          
         
          <div className="px-8 pb-8">
         
            <div className="relative -mt-16 mb-8">
              <div className="relative inline-block">
                <img
                  src={formData.avatar}
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
                      <Camera className="w-5 h-5" />
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div> */}

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
  );
}