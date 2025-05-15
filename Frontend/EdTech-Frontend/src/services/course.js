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

  }
  

  const courseService = new CourseService("http://localhost:8012/api/v1/course");
  export default courseService
  