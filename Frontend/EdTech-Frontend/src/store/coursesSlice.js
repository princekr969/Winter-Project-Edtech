import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  courses: [
    { 
      id:'1',
      title: "Brand & Identity Design for Marketers",
      description:
        "Lorem ipsum dolor sit amet, consectetere adipiscing elit. Feugiat feugiat congue viverra facilisis.",
      imageUrl:
        "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 399.00,
      rating: 3.6,
      category: 'cloud',
      author:{
        avatar: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name:"log",
      },
      modules: [
        {
          id: '1',
          title: "Introduction to Programming",
          lessons: [
            { id: '1', title: "Getting Started", videoUrl: "https://youtu.be/RiZL2j5mIPw?si=gPv5meQGQf_cfbNL" },
            { id: '2', title: "Basic Concepts", videoUrl: "https://youtu.be/RiZL2j5mIPw?si=gPv5meQGQf_cfbNL" },
          ]
        },
        {
          id: '2',
          title: "Advanced Topics",
          lessons: [
            { id: '3', title: "Data Structures", videoUrl: "https://youtu.be/RiZL2j5mIPw?si=gPv5meQGQf_cfbNL" },
            { id: '4', title: "Algorithms", videoUrl: "https://youtu.be/RiZL2j5mIPw?si=gPv5meQGQf_cfbNL" },
          ]
        }
      ]
    },
    { 
      id:'2',
      title: "Mastering Digital Marketing",
      description:
        "Dive into the world of digital marketing, SEO, content strategy, and advertising.",
      imageUrl:
        "https://images.pexels.com/photos/1181336/pexels-photo-1181336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 899.00,
      rating: 3.9,
      category: 'dsa',
      author:{
        avatar: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name:"suyash",
      },
      modules: [
        {
          id: '1',
          title: "Introduction to Digital Marketing",
          lessons: [
            { id: '1', title: "What is Digital Marketing?", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
            { id: '2', title: "Setting Goals", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
          ]
        },
        {
          id: '2',
          title: "SEO and Content Strategy",
          lessons: [
            { id: '3', title: "SEO Basics", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
            { id: '4', title: "Content Planning", videoUrl: "https://youtu.be/1OAjeECW90E?si=pJ3gBSMikivIbrpk" },
          ]
        }
      ]
    },
    {
      id:'3',
      title: "Web Development Bootcamp",
      description:
        "Learn how to build full-stack web applications using HTML, CSS, JavaScript, and more.",
      imageUrl:
        "https://images.pexels.com/photos/1181231/pexels-photo-1181231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1499.00,
      rating: 4,
      category: 'web-dev',
      author:{
        avatar: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name:"shery",
      },
      modules: [
        {
          id: '1',
          title: "Frontend Development",
          lessons: [
            { id: '1', title: "HTML and CSS Basics", videoUrl: "https://youtu.be/qDDyuDMJ8-o?si=Fp-OrsQtzePYyRks" },
            { id: '2', title: "JavaScript for Beginners", videoUrl: "https://youtu.be/qDDyuDMJ8-o?si=Fp-OrsQtzePYyRks" },
          ]
        },
        {
          id: '2',
          title: "Backend Development",
          lessons: [
            { id: '3', title: "Introduction to Node.js", videoUrl: "https://youtu.be/qDDyuDMJ8-o?si=Fp-OrsQtzePYyRks" },
            { id: '4', title: "Working with Databases", videoUrl: "https://youtu.be/qDDyuDMJ8-o?si=Fp-OrsQtzePYyRks" },
          ]
        }
      ]
    },
    { 
      id:'4',
      title: "Data Science & Machine Learning",
      description:
        "Master data science and machine learning techniques, including data visualization and neural networks.",
      imageUrl:
        "https://images.pexels.com/photos/62681/pexels-photo-62681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1999.00,
      rating: 4.6,
      category: 'ml',
      author:{
        avatar: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name:"prince",
      },
      modules: [
        {
          id: '1',
          title: "Data Science Fundamentals",
          lessons: [
            { id: '1', title: "Introduction to Data Science", videoUrl: "https://youtu.be/qDDyuDMJ8-o?si=mPGJMlrlECW5UpLV" },
            { id: '2', title: "Data Cleaning and Preparation", videoUrl: "https://youtu.be/qDDyuDMJ8-o?si=mPGJMlrlECW5UpLV" },
          ]
        },
        {
          id: '2',
          title: "Machine Learning Techniques",
          lessons: [
            { id: '3', title: "Supervised Learning", videoUrl: "https://youtu.be/qDDyuDMJ8-o?si=mPGJMlrlECW5UpLV" },
            { id: '4', title: "Unsupervised Learning", videoUrl: "https://youtu.be/qDDyuDMJ8-o?si=mPGJMlrlECW5UpLV" },
          ]
        }
      ]
    },
    { 
      id:'5',
      title: "Photography for Beginners",
      description:
        "A guide to photography basics, including composition, lighting, and editing tips.",
      imageUrl:
        "https://images.pexels.com/photos/2365562/pexels-photo-2365562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 499.00,
      rating: 3.6,
      category: 'mobile',
      author:{
        avatar:"https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name:"Harshit",
      },
      modules: [
        {
          id: '1',
          title: "Camera Basics",
          lessons: [
            { id: '1', title: "Camera Settings", videoUrl: "https://youtu.be/9CvwbW9UhJc?si=VeqpOGaep4FK7kVB" },
            { id: '2', title: "Lighting Techniques", videoUrl: "https://youtu.be/9CvwbW9UhJc?si=VeqpOGaep4FK7kVB" },
          ]
        },
        {
          id: '2',
          title: "Post-Processing & Editing",
          lessons: [
            { id: '3', title: "Editing Photos in Lightroom", videoUrl: "https://youtu.be/9CvwbW9UhJc?si=VeqpOGaep4FK7kVB" },
            { id: '4', title: "Advanced Editing in Photoshop", videoUrl: "https://youtu.be/9CvwbW9UhJc?si=VeqpOGaep4FK7kVB" },
          ]
        }
      ]
    }
  ],
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
    
  },
});

export const {
  courses,
  enrolledCourse,
} = coursesSlice.actions;
export default coursesSlice.reducer;