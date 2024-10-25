import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
	cloudinary: cloudinary.v2,
	params: {
		folder: "uploads",
		resource_type: "auto",
		allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4", "webm"],
	} as any, //TODO : type any
});

export default cloudinary.v2;
