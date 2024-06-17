import express from "express";
const router =express.Router();

import addStudent from "./addStudent.js"; //creating end point 


router.use("/add_student", addStudent);  // /add_student =this should be use in postman for url

export default router;

//import and use this handler also in routes