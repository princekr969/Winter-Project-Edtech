import fs from 'fs';
import multer from 'multer';

// Ensure the directory exists
const tempDir = './public/temp';
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);  // Use the existing temp directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
export const uploadMultiple = multer({ storage: storage }).array('videos', 10); // 'videos' is the field name, 10 is the max number of files

export const upload = multer({ storage: storage });
