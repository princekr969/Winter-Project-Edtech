import React from "react";

const CourseInfo = ({ course, categories }) => {
  const categoryName = categories.find(cat => cat.id === course.category)?.name || "";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={course.title}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            value={course.price}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          type="text"
          value={categoryName}
          disabled
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={course.description}
          disabled
          rows={3}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Image
        </label>
        <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-gray-200">
          <img
            src={course.imageUrl}
            alt="Course preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <span className="text-white text-xs px-2 py-1 bg-black bg-opacity-50 rounded">Cannot edit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
