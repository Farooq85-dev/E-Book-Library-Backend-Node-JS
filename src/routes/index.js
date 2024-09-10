import { Router } from "express";
import { PostBook } from "../controllers/Books/addbooks.controller.js";
import { GetBook } from "../controllers/Books/getbook.controller.js";
import { UpdateBook } from "../controllers/Books/updatebook.controller.js";
import { DeleteBook } from "../controllers/Books/deletebook.controller.js";
import { RegisterUser } from "../controllers/User/registeruser.controller.js";
import { LoginUser } from "../controllers/User/loginUser.controller.js";
import { LogoutUser } from "../controllers/User/logoutuser.controller.js";
import { UpdateUser } from "../controllers/User/updateuser.controller.js";
import { DeleteUser } from "../controllers/User/deleteuser.controller.js";
import { UploadController } from "../controllers/Books/upload.controller.js";

import fs from "fs";
import multer from "multer";
import path from "path";

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
router.post("/registerUser", upload.none(), RegisterUser);
router.post("/logoutUser", LogoutUser);
router.post("/addBook", upload.single("bookImage"), UploadController, PostBook);

// GET Routes
router.get("/loginUser", LoginUser);
router.get("/getBook", GetBook);

// PUT Routes
router.put("/updateUser/:id", upload.none(), UpdateUser);
router.put("/updateBook/:id", upload.none(), UpdateBook);

// DELETE Routes
router.delete("/deleteUser/:id", DeleteUser);
router.delete("/deleteBook", DeleteBook);

// Exporting Router
export { router };
