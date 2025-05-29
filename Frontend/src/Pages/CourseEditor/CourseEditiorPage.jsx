import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import ModuleList from "./ModuleList";
import EditLessonPage from "./EditLessonPage";
import AddModulePage from "./AddModulePage";
import courseService from "../../services/course";
import { useParams } from "react-router-dom";

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
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [editingState, setEditingState] = useState({
    moduleId: null,
    lessonId: null,
  });

  console.log("formData1", formData);
  
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        // Step 1: Fetch course
        console.log("courseId", courseId)
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
    }finally{
      setLoading(false);
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
    setEditingState({ moduleId: moduleId, lessonId: null });
  };

  const handleUpdateLesson = (formDat) => {

    const uploadLesson = async ()=>{
      try {
        const moduleId=editingState.moduleId;
        const response = await courseService.addLesson({...formDat,moduleId});
  
        // console.log("hereee",response);
        // console.log("hereee",formData.modules);
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
        if(response.success){
          setEditingState({ moduleId: null, lessonId: null });
        }
      } catch (error) {
        console.log("add lesson error", error);
      }
    }
    uploadLesson();
    
  };

  const handleDeleteModule = (moduleId) => {
    setFormData({
      ...formData,
      modules: formData.modules.filter((module) => module.id !== moduleId),
    });
  };

  const handleDeleteLesson = (moduleId, lessonId) => {
    console.log("moduleId",moduleId);
    console.log("lessonId",lessonId);
    const deleteLesson = async ()=>{
      const response = await courseService.deleteLesson({moduleId,lessonId});
      console.log("hereeeeeee",response.data);
      setFormData({
        ...formData,
        modules: formData.modules.map((module) =>
          module._id === moduleId
            ? {
                ...module,
                lessons: module.lessons.filter((lesson) => lesson._id !== lessonId),
              }
            : module
        ),
      })
    }
    deleteLesson();
  };

  const handleCancelLesson = () => {
    setEditingState({ moduleId: null, lessonId: null });
  };

  const handleFormCancel = () => {
    setFormData({});
    setIsAddingModule(false);
    setEditingState({ moduleId: null, lessonId: null });
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
          addingLesson={(editingState.moduleId===null)?true:false}
        />
      );
    
  }


  const Loader = ({ size = '8', color = 'blue-500', text = 'Loading...' }) => {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div
          className={`animate-spin rounded-full h-${size} w-${size} border-t-4 border-b-4 border-${color}`}
        ></div>
        {text && <p className="mt-2 text-gray-600">{text}</p>}
      </div>
    );
  };

  return (!loading)? (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">

          <div className="bg-white space-y-6 shadow">
            <div className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-gray-800">{formData?.title}</h2> 
              <ModuleList
                modules={formData?.modules}
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
  ):<Loader/>;
};

export default CourseEditorPage;
