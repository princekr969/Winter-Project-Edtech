import { ShoppingCart } from 'lucide-react'
import {forwardRef} from 'react'
import { Link } from 'react-router-dom'

const CartIcon = forwardRef((props, ref) => {
    const {isOpen, itemCount, setIsCartOpen} = props
  return (
    <div ref={ref}>
      <button
          type="button"
          className="max-sm:hidden inline-flex mr-3 relative items-center p-2 w-12 h-12 justify-center text-sm text-gray-500 rounded-lg  hover:text-blue-700 hover:bg-slate-100  "
          onClick={() => setIsCartOpen(!isOpen)}
        >
          <ShoppingCart className="w-6 h-6" />
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0.5 -end-0.5 dark:border-gray-900">{itemCount}</div>
        </button>
      <Link
          to="/cart"
          className="sm:hidden inline-flex mr-3 relative items-center p-2 w-12 h-12 justify-center text-sm text-gray-500 rounded-lg  hover:text-blue-700 hover:bg-slate-100  "
        >
          <ShoppingCart className="w-6 h-6" />
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0.5 -end-0.5 dark:border-gray-900">{itemCount}</div>
        </Link>
    </div>
  )
})

export default CartIcon
