import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import CourseInfo from "./CourseInfo";
import ModuleList from "./ModuleList";
import EditLessonPage from "./EditLessonPage";
import AddModulePage from "./AddModulePage";

const course = {
  id: 2,
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


const CourseEditorPage = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState(course);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [editingState, setEditingState] = useState({
    moduleId: null,
    lessonId: null,
  });

  const handleAddModule = () => {
    setIsAddingModule(true);
  };

  const handleSaveModule = (moduleData) => {
    const newModule = {
      id: crypto.randomUUID(),
      ...moduleData,
    };
    setFormData({
      ...formData,
      modules: [...formData.modules, newModule],
    });
    setIsAddingModule(false);
  };

  const handleCancelModule = () => {
    setIsAddingModule(false);
  };

  const handleAddLesson = (moduleId) => {
    const newLesson = {
      id: crypto.randomUUID(),
      title: "New Lesson",
      videoUrl: "",
    };

    setFormData({
      ...formData,
      modules: formData.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: [...module.lessons, newLesson],
            }
          : module
      ),
    });

    setEditingState({ moduleId: null, lessonId: newLesson.id });
  };

  const handleUpdateLesson = (moduleId, lessonId, updates) => {
    setFormData({
      ...formData,
      modules: formData.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, ...updates } : lesson
              ),
            }
          : module
      ),
    });
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

  if (editingState.lessonId) {
    const moduleWithLesson = formData.modules.find((module) =>
      module.lessons.some((lesson) => lesson.id === editingState.lessonId)
    );
    const lessonToEdit = moduleWithLesson?.lessons.find(
      (lesson) => lesson.id === editingState.lessonId
    );

    if (moduleWithLesson && lessonToEdit) {
      return (
        <EditLessonPage
          lesson={lessonToEdit}
          moduleId={moduleWithLesson.id}
          onSave={(updates) => handleUpdateLesson(moduleWithLesson.id, lessonToEdit.id, updates)}
          onCancel={handleCancelLesson}
        />
      );
    }
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
