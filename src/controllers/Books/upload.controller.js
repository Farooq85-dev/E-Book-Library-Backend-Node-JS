import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Dotenv Configs
dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadController = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error("File not provided!");
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

    console.log(uploadResult);

    // Attach the file URL to req.body for use in PostBookData
    req.body.bookImage = uploadResult;
    // Pass control to the next middleware
    next();
  } catch (error) {
    console.log("---- Error in uploading file ----", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

export { UploadController };
