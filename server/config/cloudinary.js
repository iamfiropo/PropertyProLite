import cloudinary from 'cloudinary';
import { config } from 'dotenv';
import Response from '../utils/helpers/response';

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class Upload {
  static async uploadFile(req, res) {
    try {
      if (req.files === null || req.files === undefined) return undefined;
      const file = req.files.photo;
      const photo = await cloudinary.v2.uploader.upload(file.tempFilePath, (error, result) => {
        if (error) return undefined;
        return result.secure_url;
      });
      return photo.secure_url;
    } catch (error) {
      return Response.handleError(500, error.message, res);
    }
  }
}

export default Upload;
