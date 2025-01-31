import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';

export default function CourseEditor({ course, onSave, onClose }) {
  const [formData, setFormData] = useState(
    course || {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      thumbnail: '',
      price: 0,
      modules: [],
      authorId: 'current-user-id',
    }
  );

  const addModule = () => {
    setFormData({
      ...formData,
      modules: [
        ...formData.modules,
        { id: crypto.randomUUID(), title: 'New Module', lessons: [] },
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
                { id: crypto.randomUUID(), title: 'New Lesson', content: '', notes: '' },
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {course ? 'Edit Course' : 'New Course'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Modules</h3>
                <button
                  onClick={addModule}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Module
                </button>
              </div>

              {formData.modules.map((module) => (
                <div key={module.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={module.title}
                      onChange={(e) => updateModule(module.id, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => addLesson(module.id)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Lesson
                    </button>
                  </div>

                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} className="ml-6 space-y-2">
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) => updateLesson(module.id, lesson.id, { title: e.target.value })}
                        placeholder="Lesson title"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <textarea
                        value={lesson.content}
                        onChange={(e) => updateLesson(module.id, lesson.id, { content: e.target.value })}
                        placeholder="Lesson content"
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <textarea
                        value={lesson.notes}
                        onChange={(e) => updateLesson(module.id, lesson.id, { notes: e.target.value })}
                        placeholder="Additional notes"
                        rows={2}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
