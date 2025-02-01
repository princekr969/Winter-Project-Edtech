import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Save,
  Image as ImageIcon,
  Video,
} from "lucide-react";

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

export default function CourseEditorPage({ onSave, onClose }) {
  const [formData, setFormData] = useState(
    course || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      imageUrl: "",
      price: 0,
      category: "",
      modules: [],
      author: {
        avatar: "",
        name: "",
      },
    }
  );
  const [previewImage, setPreviewImage] = useState(formData.imageUrl || "");
  const imageInputRef = useRef(null);
  const videoInputRefs = useRef({});

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData({ ...formData, imageUrl });
    }
  };

  const handleVideoUpload = (moduleId, lessonId, event) => {
    const file = event.target.files[0];
    if (file) {
      updateLesson(moduleId, lessonId, { videoUrl: file.name });
    }
  };

  const addModule = () => {
    setFormData({
      ...formData,
      modules: [
        ...formData.modules,
        { id: crypto.randomUUID(), title: "New Module", lessons: [] },
      ],
    });
  };

  const addLesson = (moduleId) => {
    setFormData({
      ...formData,
      modules: formData.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: crypto.randomUUID(),
                  title: "New Lesson",
                  videoUrl: "",
                },
              ],
            }
          : module
      ),
    });
  };

  const updateModule = (moduleId, title) => {
    setFormData({
      ...formData,
      modules: formData.modules.map((module) =>
        module.id === moduleId ? { ...module, title } : module
      ),
    });
  };

  const updateLesson = (moduleId, lessonId, updates) => {
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
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  }
  
  const handleFormCanceled = () => {
    setFormData(course)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
    
      {/* Main content */}
      <main className="max-w-4xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          className="space-y-6"
          onSubmit={handleFormSubmit}
        >
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Choose Image
                    </button>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  {previewImage && (
                    <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                      <img
                        src={previewImage}
                        alt="Course preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Course Content
                  </h3>
                  <button
                    type="button"
                    onClick={addModule}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Module
                  </button>
                </div>

                {formData.modules.map((module) => (
                  <div
                    key={module.id}
                    className="bg-gray-50 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) =>
                          updateModule(module.id, e.target.value)
                        }
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => addLesson(module.id)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Lesson
                      </button>
                    </div>

                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="ml-6 space-y-2 bg-white p-4 rounded-lg shadow-sm"
                      >
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) =>
                            updateLesson(module.id, lesson.id, {
                              title: e.target.value,
                            })
                          }
                          placeholder="Lesson title"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() =>
                              videoInputRefs.current[
                                `${module.id}-${lesson.id}`
                              ]?.click()
                            }
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Video className="w-4 h-4" />
                            {lesson.videoUrl ? "Change Video" : "Upload Video"}
                          </button>
                          <input
                            ref={(el) =>
                              (videoInputRefs.current[
                                `${module.id}-${lesson.id}`
                              ] = el)
                            }
                            type="file"
                            accept="video/*"
                            onChange={(e) =>
                              handleVideoUpload(module.id, lesson.id, e)
                            }
                            className="hidden"
                          />
                          {lesson.videoUrl && (
                            <span className="text-sm text-gray-600">
                              {lesson.videoUrl}
                            </span>
                          )}
                        </div>
                        {/* <textarea
                          value={lesson.content}
                          onChange={(e) =>
                            updateLesson(module.id, lesson.id, {
                              content: e.target.value,
                            })
                          }
                          placeholder="Lesson content"
                          rows={3}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                        <textarea
                          value={lesson.notes}
                          onChange={(e) =>
                            updateLesson(module.id, lesson.id, {
                              notes: e.target.value,
                            })
                          }
                          placeholder="Additional notes"
                          rows={2}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        /> */}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleFormCanceled}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium"
            >
              <Save className="w-4 h-4" />
              Save Course
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
