import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartIcon from "../Cart/CartIcon"
import CartItem from '../Cart/CartItem';

function CartDropdown() {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const dropdownRef = useRef(null);
    const items = useSelector(state => state.cart.items)
    const total = useSelector(state => state.cart.totalItems)

    const handleCheckout = () => {

    }

    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id))
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
    <CartIcon isOpen={isOpen} onClose={setIsOpen} itemCount={items.length}/>
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
              <CartItem key={item.id} item={item} from={"dropdown"}/>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold text-blue-600">₹{total}</span>
        </div>
        <Link
          to={"/cart"}
          className="w-full block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Checkout
        </Link>
      </div>
    </div>
    }
    </>
  );
}

export default CartDropdown;
