import { v2 as cloudinary } from 'cloudinary';

 // Configuration
 cloudinary.config({ 
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
     api_key: CLOUDINARY_API_KEY, 
     api_secret: CLOUDINARY_API_SECRET
 });


 const uploadOnClloudinary = async (localFilePath) => {
    try {
         if(!localFilePath) return null
      const response =await cloudinary.uploader.upload(localFilePath, {
             resource_type: "auto"
         })
         console.log("File uploaded", response.url);
         return response;
     } 
     catch (error) {
         Fs.unlink(localFilePath); //remove the locally saved temporary file as the upload operation failed
     }
}
