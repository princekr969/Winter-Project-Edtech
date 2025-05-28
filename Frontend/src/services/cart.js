import axios from 'axios';

export class CartService{
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async addItem(courseId){
        const url = this.baseUrl + '/add-item';
        try {
            const res = await axios.post(url, {courseId}, {withCredentials:true});
            // console.log("addItemRes", res);
            return res;
        } catch (error) {
            if(error.response){
                console.log("Backend service :: addItem :: error", error.response.data);
                return error.response.data;
            }else{
                console.log("Backend service :: addItem :: error", error.message);
                return {message: "Something went wrong"};
            }
        }
    }
    
    async deleteCartItem(cartItemId){
        const url = this.baseUrl + '/delete-item';
        try {
            const res = await axios.post(url, {cartItemId}, {withCredentials:true});
            // console.log("addItemRes", res);
            return res;
        } catch (error) {
            if(error.response){
                console.log("Backend service :: deleteCartItem :: error", error.response.data);
                return error.response.data;
            }else{
                console.log("Backend service :: deleteCartItem :: error", error.message);
                return {message: "Something went wrong"};
            }
        }
    }

    async getAllUserCartItem(cartItemIds){
        const url = this.baseUrl + '/get-items';
        try {
            const res = await axios.post(url, {cartItemIds}, {withCredentials:true});

            return res.data;
        } catch (error) {
            if(error.response){
                console.log("Backend service :: getAllUserCartItem :: error", error.response.data);
                return error.response.data;
            }else{
                console.log("Backend service :: getAllUserCartItem :: error", error.message);
                return {message: "Something went wrong"};
            }
        }
    }
}

const cartService = new CartService("https://winter-project-edtech.onrender.com/api/v1/cart");
export default cartService;
