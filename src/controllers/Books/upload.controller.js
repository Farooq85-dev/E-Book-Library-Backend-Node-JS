import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Please provide file!",
      });
    }

    const filePath = path.join(req.file.destination, req.file.filename);

    // Upload to Cloudinary with conversion to WebP format
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "MY-IMAGES",
      transformation: [
        { width: 800, crop: "scale" },
        { fetch_format: "webp" },
        { quality: "auto:low" },
      ],
    });

    // Cleanup: Remove the file from the local uploads folder after uploading to Cloudinary
    fs.unlinkSync(filePath);

    // Attach the file URL to req.body for use in PostBookData
    req.body.bookImage = uploadResult;
    // Pass control to the next middleware
    next();
  } catch (error) {
    console.log("---- Error in uploading file ----", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Error occurred in file uploading. Please try again!",
    });
  }
};

export { UploadController };
