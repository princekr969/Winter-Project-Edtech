import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users2, Star, BookOpen, Rocket, Brain, Code } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'web-dev', name: 'Web Development' },
  { id: 'dsa', name: 'Data Structures & Algorithms' },
  { id: 'ml', name: 'Machine Learning' },
  { id: 'mobile', name: 'Mobile Development' },
  { id: 'cloud', name: 'Cloud Computing' },
];

const courses = [
  {
    id: 1,
    title: 'Advanced Web Development Masterclass',
    category: 'web-dev',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: 'John Doe',
    rating: 4.8,
    students: 2500,
    duration: '12 weeks',
    price: 499,
  },
  {
    id: 2,
    title: 'Data Structures & Algorithms in Python',
    category: 'dsa',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: 'Jane Smith',
    rating: 4.9,
    students: 3200,
    duration: '10 weeks',
    price: 449,
  },
  
  {
    id: 3,
    title: 'Machine Learning Fundamentals',
    category: 'ml',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: 'David Wilson',
    rating: 4.7,
    students: 1800,
    duration: '14 weeks',
    price: 599,
  },
  {
    id: 4,
    title: 'Mobile App Development with React Native',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: 'Sarah Johnson',
    rating: 4.6,
    students: 1500,
    duration: '10 weeks',
    price: 549,
  },
  {
    id: 5,
    title: 'AWS Cloud Architecture',
    category: 'cloud',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: 'Mike Brown',
    rating: 4.9,
    students: 2100,
    duration: '8 weeks',
    price: 649,
  },
  {
    id: 6,
    title: 'Full-Stack JavaScript Development',
    category: 'web-dev',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: 'Emma Davis',
    rating: 4.8,
    students: 2800,
    duration: '16 weeks',
    price: 699,
  },
  {
    id: 7,
    title: 'Advanced Algorithms Masterclass',
    category: 'dsa',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: 'Alex Thompson',
    rating: 4.9,
    students: 1900,
    duration: '12 weeks',
    price: 549,
  },
  {
    id: 8,
    title: 'Deep Learning & Neural Networks',
    category: 'ml',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: 'Rachel Kim',
    rating: 4.8,
    students: 1600,
    duration: '14 weeks',
    price: 699,
  },
  {
    id: 9,
    title: 'iOS App Development with Swift',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: 'Chris Martinez',
    rating: 4.7,
    students: 1400,
    duration: '12 weeks',
    price: 599,
  }
];

const stats = [
  { icon: BookOpen, label: 'Total Courses', value: '500+' },
  { icon: Users2, label: 'Active Students', value: '50,000+' },
  { icon: Star, label: 'Expert Instructors', value: '100+' },
];

function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCourses, setVisibleCourses] = useState(3);

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  const handleLoadMore = () => {
    setVisibleCourses(prev => Math.min(prev + 3, filteredCourses.length));
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
            alt="Hero background"
            className="w-full h-full object-cover mix-blend-multiply"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Unlock Your Potential with Expert-Led Courses
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Learn from industry experts and advance your career with our comprehensive course catalog. Master new skills at your own pace.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                Browse Courses
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <Icon className="w-12 h-12 text-blue-200" />
                <div>
                  <div className="text-3xl font-bold">{value}</div>
                  <div className="text-blue-200">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Navigation */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Our Courses</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setVisibleCourses(3); // Reset visible courses when changing category
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.slice(0, visibleCourses).map(course => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  by {course.instructor}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users2 className="w-4 h-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${course.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {filteredCourses.length > visibleCourses && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Load More Courses
              <span className="ml-2 text-sm text-gray-500">
                ({visibleCourses} of {filteredCourses.length})
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
