import React, { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

function ErrorPopup({ message,
     type = 'error', 
     duration = 3000
    }) {
    
    const [isVisible, setIsVisible]  = useState(true)
    const onClose = () => {
      setIsVisible(false)
    }
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className={`
        flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg
        ${type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : ''}
        ${type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : ''}
        ${type === 'warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : ''}
      `}>
        <AlertCircle className="w-5 h-5" />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 p-1 rounded-full hover:bg-black/5 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
