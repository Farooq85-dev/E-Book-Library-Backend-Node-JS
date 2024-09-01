import { model, Schema } from "mongoose";

const BooksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    publishDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model("Books", BooksSchema);
