import { Router } from "express";
import { PostUserData } from "../controllers/postuser.controller.js";
import { GetUserData } from "../controllers/getuser.controller.js";
import { UpdateUserData } from "../controllers/updateuser.controller.js";
import { DelData } from "../controllers/delete.controller.js";
import { PostBookData } from "../controllers/postbooks.controller.js";
import { GetBookData } from "../controllers/getbook.controller.js";
import multer from "multer";

// To Parse Form Data
const upload = multer();

//Creating Route To User All Requests
const router = Router();

//POST Routes
router.post("/registerUser", PostUserData);
router.post("/addBook", upload.none(), PostBookData);
//GET Routes
router.get("/loginUser", GetUserData);
router.get("/getBook", GetBookData);
//PUT Routes
router.put("/updateUser/:id", UpdateUserData);
//Delete Routes
router.delete("/deleteUser/:id", DelData);

//Exporting Router
export { router };
