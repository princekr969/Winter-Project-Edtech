import  { useState, useEffect } from 'react';
import {BookOpen, PlayCircle } from 'lucide-react';
import Module from '../components/Course/Module';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollButton.jsx';
import courseService from '../services/course.js';


function CourseVideoPlayerPage() {
  const {courseId, lessonId, moduleId} = useParams()
  const [selectedLesson, setSelectedLesson] = useState(null);
  // console.log("moduleId",moduleId);
  // console.log("lessonId",lessonId);
  // console.log("courseId",courseId);
  const [course, setCourse] = useState(
       {
  _id: 2,
  title: "Mastering Digital Marketing",
  description:
    "Dive into the world of digital marketing, SEO, content strategy, and advertising.",
  imageUrl:
    "https://images.pexels.com/photos/1181336/pexels-photo-1181336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  price: 899.00,
  category: "dsa",
  author: {
    avatar:
      "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "suyash",
  },
  modules: [
    {
      _id: 1,
      title: "Introduction to Digital Marketing",
      lessons: [
        {
          _id: 1,
          title: "What is Digital Marketing?",
          videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk",
        },
        {
          _id: 2,
          title: "Setting Goals",
          videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk",
        },
      ],
    },
    {
      _id: 2,
      title: "SEO and Content Strategy",
      lessons: [
        {
          _id: 3,
          title: "SEO Basics",
          videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk",
        },
        {
          _id: 4,
          title: "Content Planning",
          videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk",
        },
      ],
    },
  ],
}
    );
 useEffect(() => {
  const fetchCourseData = async () => {
    try {
      const cid = { courseId: courseId };
      
      // Step 1: Fetch course
      const courseResponse = await courseService.getCourseById(cid);
      const courseData = courseResponse.data;

      // Step 2: Fetch modules
      const modulesResponse = await courseService.getAllModules(cid);
      const modules = modulesResponse.data;

      // Step 3: Fetch lessons for each module
      const modulesWithLessons = await Promise.all(
        modules.map(async (module) => {
          const lessonsResponse = await courseService.getAllLessons(module._id);
          return {
            ...module,
            lessons: lessonsResponse.data,
          };
        })
      );

      // Step 4: Combine everything into course state
      const fullCourse = {
        ...courseData,
        modules: modulesWithLessons,
      };
      setCourse(fullCourse);

      // Step 5: Find and set the selected lesson
      const selectedModule = modulesWithLessons.find(
        (mod) => String(mod._id) === String(moduleId)
      );

      if (selectedModule) {
        const lesson = selectedModule.lessons.find(
          (les) => String(les._id) === String(lessonId)
        );
        setSelectedLesson(lesson || null);
      }

    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  fetchCourseData();
}, [courseId, moduleId, lessonId]); // depend on params in case they change

  // console.log("course",course);
  

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
    {(selectedLesson &&<>
        <div className="min-h-screen bg-gray-50">
    
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{course?.title}</h1>
              </div>
            </header>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                {selectedLesson?.videoUrl ? (
                  <ReactPlayer url={selectedLesson.videoUrl} controls width="100%" height="100%" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <PlayCircle className="w-20 h-20 text-white opacity-50" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">{selectedLesson.title || "Select a Lesson"}</h2>
                <p className="mt-1 text-sm text-gray-500">Learn the fundamentals and master the concepts step by step</p>
              </div>
            </div>
          </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                    Course Modules
                    </h3>
                </div>
                <div className=" flex gap-2 flex-col p-2 m-2">
                    {course.modules.map((module, index) => (
                      <Module module={module} index={index} courseId={courseId}/>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <ScrollToTop/>
    </>)}
    </>

    
  );
}

export default CourseVideoPlayerPage;


