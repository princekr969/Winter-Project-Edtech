import { ShoppingCart } from 'lucide-react'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

function CartIcon({isOpen, onClose, itemCount}) {
    const [cartCount, setCartCount] = useState()
    const totalItems = useSelector(state => state.cart.totalItems)
    
    useEffect(() => setCartCount(totalItems), [totalItems])

  return (
    <div>
      <button
          type="button"
          className="inline-flex mr-3 relative items-center p-2 w-12 h-12 justify-center text-sm text-gray-500 rounded-lg  hover:text-blue-700 hover:bg-slate-100  "
          onClick={() => onClose(!isOpen)}
        >
          <ShoppingCart className="w-6 h-6" />
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0.5 -end-0.5 dark:border-gray-900">{cartCount}</div>
        </button>
    </div>
  )
}

export default CartIcon
