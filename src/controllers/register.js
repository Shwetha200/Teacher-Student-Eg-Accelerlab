import express from "express";
import initTeacherModel from "../model/teacherModel";
const router=express.Router();
router.post("/",async(req,res)=>{  //in express we have router which is used to use http methods 
    try{
        const teacherModel=await initTeacherModel()
        const {teacher_name,email,phone,password}=req.body;  //we are requesting data from postman body.
        

    }catch(err){
        console.log(err);
    }

});