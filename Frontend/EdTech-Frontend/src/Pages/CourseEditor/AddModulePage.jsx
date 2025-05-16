import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const AddModulePage = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      lessons: [],
    });
  };

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className=" pb-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Add New Module</h1>
            <p className="text-sm text-gray-500 mt-1">
              Create a new module for your course
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Module Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 border-gray-300"
                placeholder="Enter module title"
              />
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium flex items-center gap-2 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2 font-medium transition-colors"
              >
                Save Module
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModulePage;
