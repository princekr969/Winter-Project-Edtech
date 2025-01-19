
export class AuthService {
    

    constructor(){
        
    };

    async createAccount({email, password, name}){
        try {
            

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
