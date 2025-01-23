import axios from "axios"

export class AuthService {
    
    endPoint = "/api/v1/users"
    
    async createAccount({email, password, firstName, lastName, phoneNumber}){
        const url = this.endPoint + "/register";
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
        const url = this.endPoint + "/login";
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

    async getCurrentUser(){
        const url = this.endPoint + "/logout";
        try {
            

            if(currentUser) return currentUser
            else return null

        } catch (error) {
            console.log("Backend service :: getCurrentUser :: error", error);
        }
    }

    async logout(){
        try {
            const url = this.endPoint + "/logout";
            const res = await axios.post(url);
            console.log('Data successfully sent from logout:', res);
            return res;
        } catch (error) {

            console.log("Backend service :: logout :: error", error);
        }
    }

};

const authService = new AuthService();

export default authService
