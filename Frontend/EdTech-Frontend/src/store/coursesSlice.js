import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  courses: [],
  enrolledCourses: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    courses: (state) => {
      state.loading = true;
      state.error = null;
    },

    enrolledCourse: (state, action) => {
      state.enrolledCourses.push(action.payload);
    },

    initializeCourses: (state, action) => {
      state.courses = action.payload;
      console.log("initialize courses", state.courses)
    },
    
    initializeEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
      console.log("initialize enrolledCourses", state.enrolledCourses)
    },
  },
});

export const {
  courses,
  enrolledCourse,
  initializeEnrolledCourses,
  initializeCourses
} = coursesSlice.actions;
export default coursesSlice.reducer;