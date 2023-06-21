import cloudinary from 'cloudinary';

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