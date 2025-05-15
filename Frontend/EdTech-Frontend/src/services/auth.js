import axios from "axios"

export class AuthService {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
      }
    
    async createAccount({email, password, firstName, lastName, phoneNumber}){
        const url = this.baseUrl + "/register";

        try {
            const userAccount = await axios.post(
                url,
                {email, password, firstName, lastName, phoneNumber},
                {withCredentials:true,}
            );
            console.log('Data successfully sent from signup:', userAccount.data.message);
            return userAccount;
            
        } catch (error) {
            if(error.response){
                console.log("Backend service :: createAccount :: error", error.response.data);
                return error.response.data;
            }else{
                console.log("Backend service :: createAccount :: error", error.message);
                return {message: "Something went wrong"};
            }
        }
        
    };

    async login({email, password}){
        const url = this.baseUrl + "/login";
        try {   
            const userAccount = await axios.post(
                url,
                {email, password},
                {withCredentials: true}
            );
            console.log('Data successfully sent from signin:', userAccount);
            return userAccount.data;

        } catch (error) {
            if(error.response){
                console.log("Backend service :: login :: error", error.response.data);
                return error.response.data;
            }else{
                console.log("Backend service :: login :: error", error.message);
                return {message: "Something went wrong"};
            }
            
        }
    };
    
    async logout(){
        try {
            const url = this.baseUrl + "/logout";
            const res = await axios.post(
                url,
                {},
                {withCredentials:true});

            console.log('Data successfully sent from logout:', res);
            return res;

        } catch (error) {
            if(error.response){
                console.log("Backend service :: logout :: error", error.response.data);
                return error.response.data;
            }else{
                console.log("Backend service :: logout :: error", error.message);
                return {message: "Something went wrong"};
            }
        }
    }
    
    async getCurrentUser(refreshToken){
        try {
            const url = this.baseUrl + "/refresh-Token";
            const userAccount = await axios.post(url, {refreshToken}, {
                withCredentials:true
            });
            console.log('Data successfully sent from  getCurrentUser:', userAccount.data.message.user);
            return userAccount.data;
        } catch (error) {
            if(error.response){
                console.log("Backend service :: getCurrentUser :: error", error.response.data);
                return error.response.data;
            }else{
                console.log("Backend service :: getCurrentUser :: error", error.message);
                return {message: "Something went wrong"};
            }
        }
    }
    
    async otpVerify({otpValue, email}){
        try {
            const url = this.baseUrl + "/verifyUser";
            console.log("otpValue",otpValue, email)
            const userAccount = await axios.post(url, {otpValue, email},{withCredentials:true});
            console.log('Data successfully sent:', userAccount.data.message.user);

            return userAccount.data.message.user;
        } catch (error) {
            if(error.response){
                console.log("Backend service :: otpVerify :: error", error.response.data);
            }else{
                console.log("Backend service :: otpVerify :: error", error.message);
            }

            return "";
        }
    }

    async forgetPassword(email){
        try {
            const url = this.baseUrl + "/forget-password";
            const userAccount = await axios.post(url, {email},{withCredentials:true});
            console.log(userAccount)
            return userAccount.data
        } catch (error) {
            if(error.response){
                console.log("Backend service :: forgetPassword :: error", error.response.data);
                return error.response.data
            }else{
                console.log("Backend service :: forgetPassword :: error", error.message);
                return {message: "Something went wrong"};
            }

            
        }
    }

    async resetPassword(password, token){
        try {
            const url = this.baseUrl + `/reset/password/${token}`;
            const userAccount = await axios.post(url, {password},{withCredentials:true});
            console.log(userAccount)
            return userAccount.data
        } catch (error) {
            if(error.response){
                console.log("Backend service :: resetPassword :: error", error.response.data);
                return error.response.data
            }else{
                console.log("Backend service :: resetPassword :: error", error.message);
                return {message: "Something went wrong"};
            }

            
        }
    }

    async uploadProfilePic(formData){
        try {
            const url = this.baseUrl + "/update-profile-picture";
            const userAccount = await axios.post(url, formData,{withCredentials:true});
            console.log("profile upload",userAccount.data)
            return userAccount.data
        } catch (error) {
            if(error.response){
                console.log("Backend service :: uploadProfilePic :: error", error.response.data);
                return error.response.data
            }else{
                console.log("Backend service :: uploadProfilePic :: error", error.message);
                return {message: "Something went wrong"};
            }
            
        }
    }
    
    async getUserById(userId){
        try {
            const url = this.baseUrl + "/get-user";
            const userAccount = await axios.post(url, {userId},{withCredentials:true});
            console.log("getUserById",userAccount.data)
            return userAccount.data
        } catch (error) {
            if(error.response){
                console.log("Backend service :: getUserById :: error", error.response.data);
                return error.response.data
            }else{
                console.log("Backend service :: getUserById :: error", error.message);
                return {message: "Something went wrong"};
            }
            
        }
    }

  
};

const authService = new AuthService("http://localhost:8012/api/v1/users");

export default authService
