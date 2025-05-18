import React, { useRef, useState, useEffect } from 'react';
import { Video, Save, X } from 'lucide-react';

const EditLessonPage = ({ lesson, moduleId, onSave, onCancel, addingLesson }) => {
  const videoInputRef = useRef(null);
  const [formData, setFormData] = useState({...lesson,video:null});

  const handleVideoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, videoUrl: file.name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-sm shadow p-6">
          <div className="pb-4 mb-2">
            <h1 className="text-2xl font-bold text-gray-800">Add Lesson</h1>
            <p className="text-sm text-gray-500 mt-1">
              Update lesson details and content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lesson Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 border-gray-300"
                placeholder="Enter lesson title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => videoInputRef.current?.click()}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <Video className="w-4 h-4" />
                  {formData.videoUrl ? 'Change Video' : 'Upload Video'}
                </button>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => 
                    setFormData({...formData,video:e.target.files[0]}) 
                  }
                  className="hidden"
                />
                {formData.videoUrl && (
                  <span className="text-sm text-gray-600 truncate max-w-[300px]">
                    {formData.videoUrl}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium flex items-center gap-2 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium transition-colors"
              >
                Add Lesson
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditLessonPage;
