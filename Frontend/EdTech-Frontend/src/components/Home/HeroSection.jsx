import React from 'react'
import img from "../../assets/heroimg.svg"


function HeroSection() {
  return (
    
    <header className="relative mt-20 pt-10 overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="container mx-auto px-6 lg:px-20 py-16 flex flex-col-reverse lg:flex-row items-center">
                {/* Left Section */}
                <div className="text-white text-center lg:text-left">
                    <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight animate-fade-in-down">
                    Unlock Your Potential with EduMaxi
                    </h1>
                    <p className="mt-4 text-lg lg:text-xl font-light animate-fade-in-up">
                    Transform the way you learn with world-class courses, interactive tools, and personalized resources designed to help you excel in your education and beyond.
     
                    </p>
                    <div className="mt-8 flex justify-center lg:justify-start gap-4 animate-fade-in-up">
                        <a href="#" className="px-6 py-3 text-blue-600 bg-white rounded-lg shadow-lg font-medium hover:bg-gray-200 transition-all">
                            Get Started
                        </a>
                        <a href="#" className="px-6 py-3 text-white border border-white rounded-lg font-medium hover:bg-blue-600 transition-all">
                            Learn More
                        </a>
                    </div>
                </div>
                {/* Right Section */}
                <div className="relative lg:w-1/2 w-full animate-slide-in-right">
                    <img 
                        src={img}
                        alt="Hero Illustration" 
                        className="w-full max-w-md lg:max-w-lg mx-auto"
                    />
                </div>
            </div>

            {/* Background Decorative Shapes */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Tailwind Animations */}
            <style>
                {`
                    @keyframes fadeInDown {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes slideInRight {
                        from {
                            opacity: 0;
                            transform: translateX(50px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    .animate-fade-in-down {
                        animation: fadeInDown 1s ease-out;
                    }

                    .animate-fade-in-up {
                        animation: fadeInUp 1s ease-out;
                    }

                    .animate-slide-in-right {
                        animation: slideInRight 1.2s ease-out;
                    }

                    .animate-pulse {
                        animation: pulse 3s infinite;
                    }
                `}
            </style>
        </header>
  )
}

export default HeroSection
