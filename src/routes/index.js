import { Router } from "express";
import { PostUserData } from "../controllers/postuser.controller.js";
import { GetUserData } from "../controllers/getuser.controller.js";
import { UpdateUserData } from "../controllers/updateuser.controller.js";
import { DeleteUserData } from "../controllers/delete.controller.js";
import { PostBookData } from "../controllers/postbooks.controller.js";
import { GetBookData } from "../controllers/getbook.controller.js";
import { UpdateBookData } from "../controllers/updatebook.controller.js";
import { DeleteBookData } from "../controllers/deletebook.controller.js";
import { UploadController } from "../controllers/upload.controller.js";
import path from "path";
import multer from "multer";
import fs from "fs";

// Ensure the uploads folder exists
const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueFileId = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueFileId}-${file.originalname}`);
  },
});

// To Parse Form Data
const upload = multer({ storage: storage });

// Creating Route To User All Requests
const router = Router();

// POST Routes
router.post("/registerUser", upload.none(), PostUserData);
router.post(
  "/addBook",
  upload.single("bookImage"),
  UploadController,
  PostBookData
);

// GET Routes
router.get("/loginUser", GetUserData);
router.get("/getBook", GetBookData);

// PUT Routes
router.put("/updateUser/:id", upload.none(), UpdateUserData);
router.put("/updateBook/:id", upload.none(), UpdateBookData);

// DELETE Routes
router.delete("/deleteUser/:id", DeleteUserData);
router.delete("/deleteBook", DeleteBookData);

// Exporting Router
export { router };
