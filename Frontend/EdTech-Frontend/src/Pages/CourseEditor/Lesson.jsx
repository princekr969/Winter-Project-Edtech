import React, { useRef } from "react";
import { Trash2, Video, Save, X } from "lucide-react";

const Lesson = ({
  lesson,
  moduleId,
  isEditing,
  onDelete,
  onUpdate,
  onSave,
  onCancel
}) => {
  

  return (
    <div className="ml-6 space-y-2 bg-white p-4 rounded-sm shadow-sm">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={lesson.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Lesson title"
          className={`w-full px-4 py-2 border rounded-sm`}
          disabled
        />
        
          <button
            type="button"
            onClick={onDelete}
            className="p-2 text-white bg-red-500 rounded-sm hover:bg-red-600 transition-colors ml-2"
            title="Delete lesson"
          >
            <Trash2 className="w-4 h-4" />
          </button>
      </div>
    </div>
  );
};

export default Lesson;
