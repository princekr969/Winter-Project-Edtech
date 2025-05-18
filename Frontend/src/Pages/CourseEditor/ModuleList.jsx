
import Module from "./Module";
import { Plus } from "lucide-react";

const ModuleList = ({
  modules,
  editingState,
  isAddingModule,
  onAddModule,
  onAddLesson,
  onSaveModule,
  onCancelModule,
  onSaveLesson,
  onCancelLesson,
  onUpdateModule,
  onUpdateLesson,
  onDeleteModule,
  onDeleteLesson
}) => {


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Course Content</h3>
        <button
          type="button"
          onClick={onAddModule}
          className={`flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors`}
        >
          Add Module
        </button>
      </div>

      <div className="space-y-4">
        {modules.map((module,index) => (
          <Module
            key={index}
            module={module}
            isEditing={editingState.moduleId === module.id}
            isAddingLesson={module.lessons?.some((l) => !l.title)}
            editingLessonId={editingState.lessonId}
            onUpdateModule={(title) => onUpdateModule(module.id, title)}
            onAddLesson={() => onAddLesson(module._id)}
            onSaveLesson={onSaveLesson}
            onCancelLesson={onCancelLesson}
            onUpdateLesson={(lessonId, updates) => onUpdateLesson(module.id, lessonId, updates)}
            onDeleteLesson={(lessonId) => onDeleteLesson(module._id, lessonId)}
            onSaveModule={() => onSaveModule(module.id)}
            onCancelModule={onCancelModule}
            onDeleteModule={() => onDeleteModule(module.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleList;
