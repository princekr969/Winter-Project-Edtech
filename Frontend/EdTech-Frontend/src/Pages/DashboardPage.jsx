import React, { useState } from 'react';
import { CourseList, CourseEditor, Profile, Sidebar } from '../components/index';
import { Outlet } from 'react-router-dom';


// Mock user data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
  bio: 'Passionate about learning and teaching technology.',
  purchasedCourses: [
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn the basics of React development',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      price: 49.99,
      modules: [
        {
          id: '1',
          title: 'Getting Started',
          lessons: [
            {
              id: '1',
              title: 'Setting up your environment',
              content: 'Learn how to set up React',
              notes: 'Important setup steps',
            },
          ],
        },
      ],
      authorId: '2',
    },
  ],
  createdCourses: [
    {
      id: '2',
      title: 'Advanced JavaScript',
      description: 'Master JavaScript programming',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      price: 79.99,
      modules: [
        {
          id: '1',
          title: 'ES6+ Features',
          lessons: [
            {
              id: '1',
              title: 'Arrow Functions',
              content: 'Understanding modern JavaScript syntax',
              notes: 'Practice exercises included',
            },
          ],
        },
      ],
      authorId: '1',
    },
  ],
};

function DashboardPage() {
  const [user, setUser] = useState(mockUser);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState(undefined);

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleSaveCourse = (course) => {
    if (editingCourse) {
      setUser({
        ...user,
        createdCourses: user.createdCourses.map((c) =>
          c.id === course.id ? course : c
        ),
      });
    } else {
      setUser({
        ...user,
        createdCourses: [...user.createdCourses, course],
      });
    }
    setIsEditing(false);
    setEditingCourse(undefined);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile user={user} onUpdate={handleUpdateProfile} />;
      case 'purchased':
        return <CourseList courses={user.purchasedCourses} type="purchased" />;
      case 'created':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Create New Course
              </button>
            </div>
            <CourseList
              courses={user.createdCourses}
              type="created"
              onEditCourse={(course) => {
                setEditingCourse(course);
                setIsEditing(true);
              }}
            />
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Your Learning Progress
                </h3>
                <p className="text-gray-600">
                  You have {user.purchasedCourses.length} courses in progress
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Your Teaching
                </h3>
                <p className="text-gray-600">
                  You have created {user.createdCourses.length} courses
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex max-sm:flex-col min-h-screen mt-20 sm:mb-3 bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8">
        <Outlet/>
        {renderContent()}
        {isEditing && (
          <CourseEditor
            course={editingCourse}
            onSave={handleSaveCourse}
            onClose={() => {
              setIsEditing(false);
              setEditingCourse(undefined);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
