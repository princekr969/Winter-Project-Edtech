import React, { useState } from 'react';
import { Camera } from 'lucide-react';

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

export default function Profile() {
  const [user, setUser] = useState(mockUser)
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [avatar, setAvatar] = useState("")

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData)
    setEditing(false);
  };

  const handleProfileAvatar = (e) => {
    const img = e.target.files[0];
    img? setAvatar(img) : console.log("select the img")
    console.log("avatar",img)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="text-center mb-8">
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
                    className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
                >
                    <Camera className="w-5 h-5" />
                </label>
                </>
          )}
        </div>
      </div>

      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
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
                setFormData(user);
                setEditing(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{formData.name}</h3>
            <p className="text-gray-600">{formData.email}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Bio</h4>
            <p className="text-gray-600">{formData.bio}</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
