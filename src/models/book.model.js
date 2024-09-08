import { model, Schema } from "mongoose";

const BooksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
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
      type: Number,
      required: true,
    },
    publishDate: {
      type: String,
      required: true,
      match: /^\d{4}$/,
    },
    bookImage: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = model("Books", BooksSchema);
