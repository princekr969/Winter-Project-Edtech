import React from 'react';
import { BookOpen, Users, Globe, Sparkles } from 'lucide-react';

function AboutPageHeroSection() {
  return (
    <div className=" bg-gradient-to-b from-indigo-50 to-white mt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-grid-indigo-500/[0.15] bg-[size:20px_20px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Transforming Education
              <span className="block text-indigo-600 mt-2">Through Innovation</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              Since 2025, we've been pioneering the future of learning by combining cutting-edge technology with proven educational methodologies to create meaningful learning experiences.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-8">
              {[
                { icon: Users, label: 'Active Learners', value: '250K+' },
                { icon: BookOpen, label: 'Courses', value: '1,000+' },
                { icon: Sparkles, label: 'Success Rate', value: '94%' },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="p-3 bg-indigo-100 rounded-full">
                    <stat.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPageHeroSection;