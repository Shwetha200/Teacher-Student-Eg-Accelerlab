import express from "express";
const router =express.Router();

import addStudent from "./addStudent.js"; //creating end point 


router.use("/add_student", addStudent); 

export default router;

//import and use this handler also in routes