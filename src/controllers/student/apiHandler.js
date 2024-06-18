import express from "express";
const router =express.Router();

import addStudent from "./addStudent.js"; //creating end point 

import listStudent from "./listStudent.js";
import getStudentById from "./getStudentByID.js";
import list from "./list.js";


router.use("/add_student", addStudent);  // /add_student =this should be use in postman for url
router.use("/list_student", listStudent);
router.use("/list_student_by_id", getStudentById);
router.use("/list_1",list);

export default router;

//import and use this handler also in routes