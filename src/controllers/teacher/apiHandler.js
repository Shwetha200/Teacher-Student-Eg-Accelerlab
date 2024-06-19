import express from "express";
const router =express.Router();

import teacherList from "./teacherList.js";
import editTeacher from "./editTeacher.js";
import getTeacherById from "./getTeacherById.js";
import listboth from "./listboth.js";



router.use("/list_teacher", teacherList);
router.use("/edit_teacher",editTeacher);//after this hit this end point in postman
router.use("/getTeacherById", getTeacherById);
router.use("/listboth", listboth);



export default router;

