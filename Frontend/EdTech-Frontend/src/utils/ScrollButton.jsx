import { useState, useEffect } from "react";
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

return (
    <button button
    onClick={scrollToTop}
    className={`fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
        showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
    }`}
    aria-label="Scroll to top"
    >
    <ArrowUp className="w-6 h-6" />
    </button>
    )
}

export default ScrollToTop;