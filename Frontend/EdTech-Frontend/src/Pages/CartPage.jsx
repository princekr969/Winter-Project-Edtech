import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../components';


function CartPage() {
  
  const items = useSelector(state => state.cart.items)
  const total = useSelector(state => state.cart.totalItems)
  const totalPrice = useSelector(state => state.cart.totalPrice)
  
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };


  return (
    <div className="min-h-screen mt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
       
        <h1 className="text-2xl font-bold mb-6">Shopping Cart ({total} items)</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            
            <div className="bg-white rounded-lg shadow-sm">
              {items.map((item) => (
                <CartItem key={item.id} item={item} from={"page"}/>
              ))}
            </div>
          </div>

          <div className="lg:w-96">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {
                items.map((item, index) => (
                  <div key={item.id} className="space-y-3 mb-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item {index+1}</span>
                    <span>₹{item.price.toFixed(2)}</span>
                  </div>
                  </div>
                ))
              }
              <div className="space-y-3 my-6 ">
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-blue-600">₹{(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-sm text-gray-500 text-center">
                Secure checkout powered by Rizen pay
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
