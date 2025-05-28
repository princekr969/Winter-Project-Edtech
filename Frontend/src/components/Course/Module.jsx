import React, { useContext } from 'react'
import { useState } from 'react';
import { ChevronDown, PlayCircle, ChevronUp, LockKeyhole } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


function Module({module,purchased, index, courseId}) {
    const [openModule, setOpenModule] = useState(null);
    const moduleId = module.id
    console.log("module",moduleId)
    
  return (
    <div
        key={index}
        className="border border-gray-200 overflow-hidden"
    >

        <button
            onClick={() =>
            setOpenModule(openModule === index ? null : index)
            }
            className="w-full px-4 py-4 flex items-start justify-between bg-white hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-center space-x-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                {index + 1}
            </span>
            <h3 className="text-lg text-start font-medium">{module.title}</h3>
            </div>
            {openModule === index ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
        </button>

        {openModule === index && (
        <div className="bg-gray-50 border-t border-gray-200">
        {module.lessons.map((lesson, lessonIndex) => (
           
            <Link 
                to={`/course/video/${courseId}/${module._id}/${lesson._id}`}
                key={lessonIndex}
                onClick={() => setSelectedLesson(lesson)}
                className="w-full text-left text-sm hover:bg-gray-50 transition-colors duration-150"
                >
                <div className="flex pl-6 py-2 border-b border-black items-center hover:bg-gray-100">
                    {(!purchased)?
                    <PlayCircle className="h-4 w-4 mr-2 text-gray-400" />
                    :<LockKeyhole className="h-4 w-4 mr-2 text-gray-400" />}
                    <span className="text-gray-600">{lesson.title}</span>
                </div>
            </Link>
        ))}
        </div>
        )}
    </div>
 
  )
}

export default Module;
