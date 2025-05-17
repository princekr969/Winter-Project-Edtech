import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import CourseInfo from "./CourseInfo";
import ModuleList from "./ModuleList";
import EditLessonPage from "./EditLessonPage";
import AddModulePage from "./AddModulePage";
import { use } from "react";
import courseService from "../../services/course";
import { useParams } from "react-router-dom";
import AddLessonPage from "./AddLessonPage";

const course = {
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
      id: 1,
      title: "Introduction to Digital Marketing",
      lessons: [
        {
          id: 1,
          title: "What is Digital Marketing?",
          videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk",
        },
        {
          id: 2,
          title: "Setting Goals",
          videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk",
        },
      ],
    },
    {
      id: 2,
      title: "SEO and Content Strategy",
      lessons: [
        {
          id: 3,
          title: "SEO Basics",
          videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk",
        },
        {
          id: 4,
          title: "Content Planning",
          videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk",
        },
      ],
    },
  ],
};

const categories = [
  { id: "dsa", name: "Data Structures & Algorithms" },
  { id: "ml", name: "Machine Learning" },
  { id: "web", name: "Web Development" },
  { id: "mobile", name: "Mobile Development" },
  { id: "cloud", name: "Cloud Computing" },
  { id: "devops", name: "DevOps" },
  { id: "security", name: "Cybersecurity" },
  { id: "blockchain", name: "Blockchain" },
  { id: "ai", name: "Artificial Intelligence" },
  { id: "database", name: "Database Management" },
];


const CourseEditorPage = ({ onSave, onClose, }) => {
  const courseId = useParams();
  const [formData, setFormData] = useState(course);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [courseModules, setCourseModules] = useState(formData.modules);
  const [editingState, setEditingState] = useState({
    moduleId: null,
    lessonId: null,
  });

useEffect(() => {
  const fetchCourseData = async () => {
    try {
      // Step 1: Fetch course
      const courseResponse = await courseService.getCourseById(courseId);
      const courseData = courseResponse.data;

      // Step 2: Fetch modules
      const modulesResponse = await courseService.getAllModules(courseId);
      const modules = modulesResponse.data;

      // Step 3: Fetch lessons for each module
      const modulesWithLessons = await Promise.all(
        modules.map(async (module) => {
          const lessonsResponse = await courseService.getAllLessons(module._id);
          return {
            ...module,
            lessons: lessonsResponse.data, // add lessons array to each module
          };
        })
      );

      // Step 4: Set all in formData
      setFormData({
        ...courseData,
        modules: modulesWithLessons,
      });

    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  fetchCourseData();
}, []);

  
  const handleAddModule = () => {
    setIsAddingModule(true);
  };

  const handleSaveModule = (moduleData) => {
    const newModule = {
      ...moduleData,
      ...courseId
    };
    const saveModule = async ()=>{
      const response = await courseService.addModule(newModule);
      console.log("here",response);
      setFormData({
        ...formData,
        modules: [...formData.modules, response.data],
      });
      console.log(newModule);
      
    }
    saveModule();
    
    
    setIsAddingModule(false);
  };

  const handleCancelModule = () => {
    setIsAddingModule(false);
  };

  const handleAddLesson = (moduleId) => {
    console.log("moduleId",moduleId);
    
    const newLesson = {
      id: crypto.randomUUID(),
      title: "New Lesson",
      videoUrl: "",
    };

    // setFormData({
    //   ...formData,
    //   modules: formData.modules.map((module) =>
    //     module._id === moduleId
    //       ? {
    //           ...module,
    //           lessons: [...module.lessons, newLesson],
    //         }
    //       : module
    //   ),
    // });

    setEditingState({ moduleId: moduleId, lessonId: null });
  };

  const handleUpdateLesson = (formDat) => {
    console.log("formDataa",formDat)

    const uploadLesson = async ()=>{
      const moduleId=editingState.moduleId;
      const response = await courseService.addLesson({...formDat,moduleId});
      console.log("hereee",response.data);
      console.log("hereee",formData.modules);
      setFormData({
      ...formData,
      modules: formData.modules.map((module) =>
        module._id === moduleId
          ? {
              ...module,
              lessons: [...module.lessons, response.data],
            }
          : module
      ),
    });
    }
    uploadLesson();
    
    setEditingState({ moduleId: null, lessonId: null });
  };

  const handleDeleteModule = (moduleId) => {
    setFormData({
      ...formData,
      modules: formData.modules.filter((module) => module.id !== moduleId),
    });
  };

  const handleDeleteLesson = (moduleId, lessonId) => {
    setFormData({
      ...formData,
      modules: formData.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.filter(
                (lesson) => lesson.id !== lessonId
              ),
            }
          : module
      ),
    });
  };

  const handleCancelLesson = () => {
    setEditingState({ moduleId: null, lessonId: null });
  };

  const handleFormCancel = () => {
    setFormData(course);
    setIsAddingModule(false);
    setEditingState({ moduleId: null, lessonId: null });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  if (isAddingModule) {
    return <AddModulePage onSave={handleSaveModule} onCancel={handleCancelModule} />;
  }

  if (editingState.moduleId) 
  {
    const lessonToEdit = {
      id: crypto.randomUUID(),
      title: "New Lesson",
    };
      return (
        <EditLessonPage
          lesson={lessonToEdit}
          moduleId={editingState.moduleId}
          onSave={handleUpdateLesson}
          onCancel={handleCancelLesson}
        />
      );
    
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">

          <div className="bg-white space-y-6 shadow">
            <div className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-gray-800">{formData.title}</h2> 
              <ModuleList
                modules={formData.modules}
                editingState={editingState}
                isAddingModule={isAddingModule}
                onAddModule={handleAddModule}
                onAddLesson={handleAddLesson}
                onUpdateLesson={handleUpdateLesson}
                onDeleteModule={handleDeleteModule}
                onDeleteLesson={handleDeleteLesson}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleFormCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Course
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default CourseEditorPage;
