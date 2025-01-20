import axios from "axios"

export class AuthService {
    
    url = "fetch endpoint"
    constructor(){
        console.log("object Created")
    }

    async createAccount({email, password, fname, lname, phoneNo}){

        try {
            const userAccount = await axios.post(url,
                {email, password, fname, lname, phoneNo}
            );
            console.log('Data successfully sent:', userAccount.data);

            if(userAccount){
                this.login({email, password})
            }else{
                return userAccount;
            }
        } catch (error) {
            console.log("Backend service :: createAccount :: error", error);
            
        }
    };

    async login({email, password}){
        try {
            const user = await axios.post(url,
                {email, password}
            );
            console.log('Data successfully sent:', user.data);

        } catch (error) {
            console.log("Backend service :: login :: error", error);
            
        }
    };

    async getCurrentUser(){
        try {
            

            if(currentUser) return currentUser
            else return null

        } catch (error) {
            console.log("Backend service :: getCurrentUser :: error", error);
        }
    }

    async logout(){
        try {
            
        } catch (error) {
            console.log("Backend service :: logout :: error", error);
            
        }
    }

};

const authService = new AuthService();

export default authService
