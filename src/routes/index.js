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
import { VerifyUser } from "../middlewares/auth.middleware.js";
import { ChangePassword } from "../controllers/User/changepassword.controller.js";
import { Upload } from "../middlewares/multer.middleware.js";

// Creating Route To User All Requests
const router = Router();

// POST Routes
router.post("/registerUser", Upload.none(), RegisterUser);
router.post("/logoutUser", VerifyUser, LogoutUser);
router.post("/changePassword", VerifyUser, Upload.none(), ChangePassword);
router.post("/addBook", Upload.single("bookImage"), UploadController, PostBook);
router.post("/loginUser", Upload.none(), LoginUser);

// GET Routes
router.get("/getBook", GetBook);

// PUT Routes
router.put("/updateUser/:id", Upload.none(), UpdateUser);
router.put("/updateBook/:id", Upload.none(), UpdateBook);

// DELETE Routes
router.delete("/deleteUser/:id", DeleteUser);
router.delete("/deleteBook", DeleteBook);

// Exporting Router
export { router };
