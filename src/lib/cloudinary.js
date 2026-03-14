import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

const getCloudinaryClient = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return null;
  }

  if (!isConfigured) {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
    isConfigured = true;
  }

  return cloudinary;
};

export const uploadImage = async (image, folder) => {
  if (!image) {
    return "";
  }

  const cloudinaryClient = getCloudinaryClient();
  if (!cloudinaryClient) {
    return image;
  }

  const result = await cloudinaryClient.uploader.upload(image, { folder });
  return result.secure_url;
};
