import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItem: (state, action) => {
            const course = action.payload
            state.items.push(course)
            state.totalItems += 1
            state.totalPrice += course.price
        },

        removeItem: (state, action) => {
            state.items.filter(item => item.id !== action.payload)
            state.totalItems -= 1
        },

        initializeCart: (state, action) => {
            const courses = action.payload
            state.items = courses;
            state.totalItems = courses.length;
            state.totalPrice = courses.reduce((acc, course) => acc + course.price, 0)
        console.log("initialize cart", state.items)

        },
    }
})

export const {addItem, removeItem, initializeCart} = cartSlice.actions;
export default cartSlice.reducer;