import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : true,
    userData: {
        // id: '1',
        // firstName: 'John',
        // lastName: 'Doe',
        // role:"student",
        // email: 'john@example.com',
        // avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
        // bio: 'Passionate about learning and teaching technology.',
        // cart: [{id:'1'},{id:'2'}],
        // purchasedCourses: [{id:'1'}],
        // createdCourses: [{id:'2'}],
      }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;