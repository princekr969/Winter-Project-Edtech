import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadToCloudinary = async (localFilePath, folder = 'profile_photos') => {
    try {
        if (!fs.existsSync(localFilePath)) {
            throw new Error('File not found at path: ' + localFilePath);
        }

        const result = await cloudinary.uploader.upload(localFilePath);

        // Remove file from local storage
        fs.unlinkSync(localFilePath);

        return result;
    } catch (error) {
        // Ensure local file is removed even if Cloudinary fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw error;
    }
};

export const uploadVideoToCloudinary = async (localFilePath, folder = 'videos') => {
    try {
        if (!fs.existsSync(localFilePath)) {
            throw new Error('Video file not found at path: ' + localFilePath);
        }

        const result = await cloudinary.uploader.upload(localFilePath, {
            folder,
            resource_type: 'video' // Important for video uploads
        });

        // Clean up local file after upload
        fs.unlinkSync(localFilePath);

        return result;
    } catch (error) {
        // Ensure cleanup even on failure
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw error;
    }
};
