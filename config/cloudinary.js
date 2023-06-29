import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.TZ_CLOUDINARY_API_SECRET
});

// Cloudinary image upload
export async function uploadImage(banner) {
    try {
        const result = await cloudinary.v2.uploader.upload(banner);
        return result.secure_url;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to upload image');
    }
}
