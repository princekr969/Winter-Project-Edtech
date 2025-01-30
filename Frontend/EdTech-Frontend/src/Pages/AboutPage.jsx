import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Target, Lightbulb } from 'lucide-react';
import { AboutPageHeroSection, AboutSection } from '../components';

function App() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <GraduationCap className="w-8 h-8 text-indigo-600" />,
      title: "Expert-Led Education",
      description: "Learn from industry professionals and experienced educators who are passionate about student success."
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Collaborative Learning",
      description: "Engage with peers in interactive sessions and group projects that enhance understanding."
    },
    {
      icon: <Target className="w-8 h-8 text-indigo-600" />,
      title: "Personalized Path",
      description: "Custom learning paths adapted to your goals and pace, ensuring optimal progress."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-indigo-600" />,
      title: "Innovative Approach",
      description: "Cutting-edge technology and teaching methods that make learning engaging and effective."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <AboutPageHeroSection/>
      <AboutSection/>

      {/* Stats Section */}
      <motion.section 
        className="bg-indigo-700 text-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">50,000+</h3>
              <p className="text-indigo-200">Active Students</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">200+</h3>
              <p className="text-indigo-200">Expert Instructors</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-2">95%</h3>
              <p className="text-indigo-200">Success Rate</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default App;