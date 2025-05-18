import React, { useState } from "react";
import Lesson from "./Lesson";
import { Plus, Trash2, Save, X } from "lucide-react";

const Module = ({
  module,
  isEditing,
  isAddingLesson,
  editingLessonId,
  onUpdateModule,
  onAddLesson,
  onSaveLesson,
  onCancelLesson,
  onUpdateLesson,
  onDeleteLesson
}) => {

  return (
    <div className="bg-gray-50 p-4 space-y-4 border border-black">
      <div className="flex gap-4">
        <input  
          type="text"
          value={module.title}
          className={`flex-1 px-4 py-2 border rounded-sm`}
          disabled
        />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onAddLesson}
              className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2`}
            >
              Add Lesson
            </button>
          </div>
      </div>

      {module.lessons && module.lessons.map((lesson) => (
        <Lesson
          key={lesson.id}
          lesson={lesson}
          moduleId={module.id}
          isEditing={editingLessonId === lesson.id}
          onDelete={() => onDeleteLesson(lesson.id)}
          onUpdate={(updates) => onUpdateLesson(lesson.id, updates)}
          onSave={() => onSaveLesson(lesson.id)}
          onCancel={onCancelLesson}
        />
      ))}
    </div>
  );
};

export default Module;
