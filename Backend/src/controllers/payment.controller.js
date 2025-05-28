import qrcode from 'qrcode';
import crypto from 'crypto';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

async function generateQR(req, res){
    // get amount and courseid, userid
    // generate qr url
    // add to db
    const {amount} = req.body;
    if(!amount){
        throw new ApiError(404, "Amount is required");
    }
    const uniqueId =  crypto.randomBytes(32).toString("hex"); 
    const upiUrl = `upi://pay?pa=${process.env.UPI_ID}&pn=PaytmReceiver&am=${amount}&cu=INR`

    const qrImageUrl = await qrcode.toDataURL(upiUrl);
    
    if(!qrImageUrl){
        throw new ApiError(500, "Qr image url not generated");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {qrImageUrl, uniqueId},
            "payment qr successfully sended")
    );

}





export {generateQR};