import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Target, Lightbulb } from 'lucide-react';

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
    <div className="py-20 px-4 bg-gray-50">
   
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At EduTech, we believe in the power of technology to revolutionize learning. 
              Our platform combines cutting-edge technology with proven educational methodologies 
              to create an engaging and effective learning experience for students worldwide.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      

    </div>
  );
}

export default App;