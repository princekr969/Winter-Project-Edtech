import React, { useState } from 'react';
import { Trash2, ArrowLeft } from 'lucide-react';

function CartPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Advanced Web Development Course",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Master modern web development techniques and frameworks"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Learn the basics of data science and analysis"
    }
  ]);

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart ({items.length} items)</h1>
            
            <div className="bg-white rounded-lg shadow-sm">
              {items.map((item) => (
                <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-blue-600 font-semibold text-lg">
                          ${item.price}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 flex items-center"
                        >
                          <Trash2 className="w-5 h-5 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-96">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-blue-600">${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-sm text-gray-500 text-center">
                Secure checkout powered by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
