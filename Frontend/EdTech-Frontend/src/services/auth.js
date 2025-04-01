import axios from "axios"

export class AuthService {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
      }
    
    async createAccount({email, password, firstName, lastName, phoneNumber}){
        const url = this.baseUrl + "/register";
        console.log(url)

        try {
            const userAccount = await axios.post(url,
                {email, password, firstName, lastName, phoneNumber}
            );
            console.log('Data successfully sent from signup:', userAccount.data.message);

            if(userAccount){
                return this.login({email, password})
            }else{
                return userAccount;
            }
        } catch (error) {
            console.log("Backend service :: createAccount :: error", error);
        }
        
    };

    async login({email, password}){
        const url = this.baseUrl + "/login";
        try {
            const userAccount = await axios.post(url,
                {email, password}
            );
            console.log('Data successfully sent from signin:', userAccount.data.message.user);
            return userAccount.data.message.user;

        } catch (error) {
            console.log("Backend service :: login :: error", error);
            
        }
    };
    
    async logout(){
        try {
            const url = this.baseUrl + "/logout";
            const res = await axios.post(url);
            console.log('Data successfully sent from logout:', res);
            return res;
        } catch (error) {

            console.log("Backend service :: logout :: error", error);
        }
    }
    
    async getCurrentUser(refreshToken){
        try {
            const url = this.baseUrl + "/refresh-Token";
            const userAccount = await axios.post(url, {refreshToken});
            console.log('Data successfully sent from  getCurrentUser:', userAccount.data.message.user);
            return userAccount.data.message.user;
        } catch (error) {
            console.log("Backend service :: getCurrentUser :: error", error);
        }
    }
    
    async otpVerify({otpValue, email}){
        try {
            const url = this.baseUrl + "/verifyUser";
            console.log("otpValue",otpValue, email)
            const userAccount = await axios.post(url, {otpValue, email});
            console.log('Data successfully sent:', userAccount.data.message.user);

            return userAccount.data.message.user;
        } catch (error) {
            console.log("Backend service :: otpVerification :: error", error);
            return "";
        }
    }
  
};

const authService = new AuthService("/api/v1/users");

export default authService
