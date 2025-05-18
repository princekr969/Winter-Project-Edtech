import React, { forwardRef } from 'react';
import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItem from '../Cart/CartItem';

const CartDropdown = forwardRef((props, ref) => {
    const {setIsCartOpen} = props
    const cartItems = useSelector(state => state.cart.items)
    const totalPrice = useSelector(state => state.cart.totalPrice)
    console.log("cartDropdown", cartItems)

    
  return (
    <>
     <div ref={ref} className="max-sm:hidden absolute right-0 top-16 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Items ({cartItems?.length})
        </h3>
        <button onClick={() =>setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {cartItems?.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {cartItems?.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
            
          </div>
        )}
      </div>
      

      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold text-blue-600">Rs.{totalPrice}</span>
        </div>
        <Link
          to={"/cart"}
          className="w-full block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Checkout
        </Link>
      </div>
    </div>
    
    </>
  );
})

export default CartDropdown;
