import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import CartIcon from "./CartIcon"



function CartDropdown() {
    const [items, setItems] = useState([
    {
      id: 1,
      title: "Advanced Web Development Course",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    }
    ]);

    const [total, setTotal] = useState((items.reduce((sum, item) => sum + item.price, 0)).toFixed(2))
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const dropdownRef = useRef(null);

    const handleCheckout = () => {

    }

    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id))
        setTotal((items.reduce((sum, item) => sum + item.price, 0)).toFixed(2))
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false)
          }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
    
    useEffect(() => {
        const handleScroll = () => setIsOpen(false);
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
      
    useEffect(() => {
        setIsOpen(false);
    }, [location])

  return (
    <>
    <CartIcon isOpen={isOpen} onClose={setIsOpen}/>
    {isOpen && 
     <div ref={dropdownRef} className="absolute right-0 top-16 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Cart ({items.length})
        </h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex gap-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-blue-600 font-semibold">${item.price}</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold text-blue-600">${total}</span>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
    }
    </>
  );
}

export default CartDropdown;
