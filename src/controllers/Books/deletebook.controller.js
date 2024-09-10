import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { Book } from "../../models/book.model.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Dotenv Configs
dotenv.config({
  path: "./.env",
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const DeleteBook = async (req, res) => {
  const { bookId, BookImgId } = req.query;

  try {
    const result = await cloudinary.uploader.destroy(BookImgId, {
      invalidate: true,
    });

    if (result.result === "not found") {
      console.log("---- Image not found in Cloudinary ----");
      return res.status(StatusCodes.NOT_FOUND).send({
        message: "---- Image not found in Cloudinary ----",
      });
    }

    const deletedBook = await Book.findByIdAndDelete(bookId);

    res.status(StatusCodes.OK).send({
      message: ReasonPhrases.OK,
      deletedBook,
      result,
    });
  } catch (error) {
    console.log("---- Error during deletion ----", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export { DeleteBook };
