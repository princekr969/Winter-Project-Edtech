import { v2 as cloudinary } from 'cloudinary';

 // Configuration
 cloudinary.config({ 
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
     api_key: process.env.CLOUDINARY_API_KEY, 
     api_secret: process.env.CLOUDINARY_API_SECRET
 });

 import fs from 'fs';

 const uploadOnCloudinary = async (localFilePath) => {
     try {
         if (!localFilePath) return null;
         const response = await cloudinary.uploader.upload(localFilePath, {
             resource_type: "auto"
         });
         console.log("File uploaded", response.url);
         fs.unlink(localFilePath, (err) => {
            if (err) console.error('Error deleting local file:', err);
        });
         return response;
     } catch (error) {
         console.error('Cloudinary upload error:', error);
         fs.unlink(localFilePath, (err) => {
             if (err) console.error('Error deleting local file:', err);
         });
         return null;
     }
 };
 

export {uploadOnCloudinary}
