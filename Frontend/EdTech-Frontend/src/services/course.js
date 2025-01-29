import axios from "axios";

class CourseAPI {
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    async getCourses() {
        const url = this.baseURL + "/getcourses";
        try {
          const response = await this.api.get(url);
          return response.data;
        } catch (error) {
          console.error("Error fetching courses:", error);
          throw error;
        }
      }
    
      async getCourseById(courseId) {
        const url = this.baseURL + "/getcourses";
        try {
          const response = await this.api.get(`${url}/${courseId}`);
          return response.data;
        } catch (error) {
          console.error("Error fetching course:", error);
          throw error;
        }
      }
    
      async createCourse(courseData) {
        try {
          const response = await this.api.post("/courses", courseData);
          return response.data;
        } catch (error) {
          console.error("Error creating course:", error);
          throw error;
        }
      }
    
      async updateCourse(courseId, courseData) {
        try {
          const response = await this.api.put(`/courses/${courseId}`, courseData);
          return response.data;
        } catch (error) {
          console.error("Error updating course:", error);
          throw error;
        }
      }
    
      async deleteCourse(courseId) {
        try {
          const response = await this.api.delete(`/courses/${courseId}`);
          return response.data;
        } catch (error) {
          console.error("Error deleting course:", error);
          throw error;
        }
      }
  }
  

  const courseAPI = new CourseAPI("https://api.example.com");
  export default courseAPI
  