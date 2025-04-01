import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import coursesSlice from './coursesSlice.js'
import cartSlice from './cartSlice.js'


const store = configureStore({
    reducer: {
        auth : authSlice,
        courses: coursesSlice,
        cart: cartSlice,
    },

});

export default store;