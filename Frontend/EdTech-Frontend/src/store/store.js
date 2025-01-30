import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import coursesSlice from './coursesSlice.js'
import { saveState, loadState } from './../utils/localStorage.js';


// Load the persisted state
const persistedState = loadState();

const store = configureStore({
    reducer: {
        auth : authSlice,
        courses: coursesSlice
    },
    
    preloadedState: persistedState, // Initialize store with persisted state
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;