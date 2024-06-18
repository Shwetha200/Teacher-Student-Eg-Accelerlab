import express from "express"
const router =express.Router();

import register from "./register.js"; //creating end point for both register and login
import login from "./login.js";


router.use("/register", register); 
router.use("/login", login);

export default router;