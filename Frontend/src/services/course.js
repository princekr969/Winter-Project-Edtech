import axios from "axios";

class CourseService {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    
      async createCourse(courseData) {
        try {
          const url = this.baseUrl + "/add-course";
          const res = await axios.post(url, courseData,{withCredentials:true});
          console.log("createCourse:", res);
          return res.data;
        } catch (error) {
          if(error.response){
                console.log("Backend service :: createCourse1 :: error", error.response.data);
                return error
            }else{
                console.log("Backend service :: createCourse2 :: error", error.message);
                return {message: "Something went wrong"};
            }
        }
      }
      
      async getCoursesByIds(courseIds) {
        try {
          const url = this.baseUrl + "/get-courses-by-ids";
          const res = await axios.post(url, {courseIds},{withCredentials:true});
          console.log("Courses by ids:", res);
          return res.data;
        } catch (error) {
          if(error.response){
                console.log("Backend service :: getCoursesByIds :: error", error.response.data);
                return error
            }else{
                console.log("Backend service :: getCoursesByIds :: error", error.message);
                return {message: "Something went wrong"};
            }
        }
      }

      async getCourseById(courseId)
      {
        try {
          const url = this.baseUrl + `/get-course-by-id`;
          const res = await axios.post(url, {courseId},{withCredentials:true});
          return res.data;
        } catch (error) {
          if(error.response)
          {
            console.log("Backend service :: getCourseById :: error", error.response.data);
            return error
          }
          else
          {
            console.log("Backend service :: getCourseById :: error", error.message);
            return {message: "Something went wrong"}
          }
        }
      }

      async addModule(newModule)
      {
        try {
          const url = this.baseUrl + `/add-module`;
          // console.log(newModule);
          // console.log(url);
          
          
          const res = await axios.post(url, newModule,{withCredentials:true});
          // console.log("Module added:", res);
          return res.data;
        } catch (error) {
          if(error.response)
          {
            console.log( error.response);
            return error
          }
          else
          {
            console.log("Backend service :: addModule :: error", error.message);
            return {message: "Something went wrong"}
          }
        }

      }

      async getAllModules(courseId)
      {
        try {
          const url = this.baseUrl + `/get-all-modules`;
          const res = await axios.post(url, {courseId},{withCredentials:true});
          // console.log("All modules:", res);
          return res.data;
        } catch (error) {
          if(error.response)
          {
            console.log("Backend service :: getAllModules :: error", error.response.data);
            return error
          }
          else
          {
            console.log("Backend service :: getAllModules :: error", error.message);
            return {message: "Something went wrong"}
          }
        }
      }

      async getAllLessons(moduleId)
      {
        try {
          // console.log("serviceee",moduleId);
          
          const url = this.baseUrl + `/get-all-lessons`;
          const res = await axios.post(url, {moduleId},{withCredentials:true});
          // console.log("All modules:", res);
          return res.data;
        } catch (error) {
          if(error.response)
          {
            console.log("Backend service :: getAllLessons :: error", error.response.data);
            return error
          }
          else
          {
            console.log("Backend service :: getAllLessons :: error", error.message);
            return {message: "Something went wrong"}
          }
        }
      }
      async addLesson(formData)
      {
        try {
          // console.log("servicess",formData);
          
          const url = this.baseUrl + `/add-lesson`;
          const res = await axios.post(url, formData,{withCredentials:true,headers:{"Content-Type": "multipart/form-data"}});
          return res.data;
        } catch (error) {
          if(error.response)
          {
            console.log("Backend service :: addLesson :: error", error.response.data);
            return error
          }
          else
          {
            console.log("Backend service :: addLesson :: error", error.message);
            return {message: "Something went wrong"}
          }
        }
      }

      async deleteLesson(formdata)
      {
        try {
          const url = this.baseUrl + `/delete-lesson`;
          const res = await axios.post(url, formdata,{withCredentials:true});
          return res.data;
        } catch (error) {
          if(error.response)
          {
            console.log("Backend service :: deleteLesson :: error", error.response.data);
            return error
          }
          else
          {
            console.log("Backend service :: deleteLesson :: error", error.message);
            return {message: "Something went wrong"}
          }
        }
      }

      async getAllCourse() {
        try {
          const url = this.baseUrl + "/get-all-course";
          const res = await axios.get(url,{withCredentials:true});
          // console.log("All course:", res);
          return res.data;
        } catch (error) {
          if(error.response){
                console.log("Backend service :: getAllCourse :: error", error.response.data);
                return error
            }else{
                console.log("Backend service :: getAllCourse :: error", error.message);
                return {message: "Something went wrong"};
            }
        }
      }


      async getUserCourses() {
        try {
          
        } catch (error) {
          
        }
      }

  }
  

  const courseService = new CourseService("https://winter-project-edtech.onrender.com/api/v1/course");
  export default courseService
  