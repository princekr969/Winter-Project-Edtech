import axios from "axios";

export class PaymentServices{
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getQRUrl(amount){
        try {
            const url = this.baseUrl + "/generate-qr";
            console.log("getqr", url)
            const payment = await axios.post(url, {amount},{withCredentials:true});
            // console.log("qr url",payment.data)
            return payment.data
        } catch (error) {
            if(error.response){
                console.log("Backend service :: getQRUrl :: error", error.response.data);
                return error.response.data
            }else{
                console.log("Backend service :: getQRUrl :: error", error.message);
                return {message: "Something went wrong"};
            }
        }
    }
}

const paymentService = new PaymentServices("https://winter-project-edtech.onrender.com/api/v1/course");

export default paymentService;
