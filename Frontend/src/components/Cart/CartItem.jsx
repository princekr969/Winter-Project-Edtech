import React from 'react'
import { Trash2, ArrowLeft } from 'lucide-react';
import cartService from '../../services/cart';
import { removeItem } from '../../store/cartSlice';
import { useDispatch } from 'react-redux';

function CartItem({item}) {
    const dispatch = useDispatch();

    const deleteItem = async (id) =>{
        try {
            const deletedItem = await cartService.deleteCartItem(id);
            console.log("Deleted item", deletedItem.data.data._id);
            dispatch(removeItem(deletedItem.data.data._id));
        } catch (error) {
            console.log("Delete cart item error", error)
        }
    }

  return (
    <div key={item._id} className="p-6 border-b border-gray-200 last:border-b-0">
        <div className="flex gap-6">
        <img
            src={item.imageUrl}
            alt={item.title}
            className="w-32 h-24 object-cover rounded-lg"
        />
        <div className="flex-grow">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600 mt-1">{item.description}</p>
            <div className="flex justify-between items-center mt-4">
            <span className="text-blue-600 font-semibold text-lg">
            Rs.{item.price}
            </span>
            <button
                onClick={() => deleteItem(item._id)}
                className="text-red-500 hover:text-red-700 flex items-center"
            >
                <Trash2 className="w-5 h-5 mr-1" />
                Remove
            </button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default CartItem
