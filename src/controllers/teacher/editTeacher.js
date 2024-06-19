import express from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import initTeacherModel from "../../model/teacherModel.js";


router.put("/:id", async (req, res) => { //get method is used to listing   //? will consider id field as optional  //in url we can get particular id of the details.
    try{
        const teacherModel=await initTeacherModel();
        const teacher_id=req.params.id;
        let response;
        const {teacher_name,email,phone}=req.body; //declaration 

        let updates={};

        const isValidId=await teacherModel.findOne({
            _id:teacher_id,
            is_active:constants.STATE.ACTIVE,
        });
        if(!isValidId){
            response=RESPONSE.INVALID_DATA;
            return res.json({
               code:response.code,
               message:"ID"+response.message,
            });
        }

        //taking values for edit
        if(teacher_name && teacher_name !=""){
            updates.teacher_name=teacher_name;
        }
        if(email && email !=""){
            updates.email=email;
        }   //then, create api end point
        if(phone && phone !=""){
            updates.phone=phone;
        } 
         
        console.log(updates);

        //to update got values
        await teacherModel.findOneAndUpdate(  //method od mongodb check first 
            {
                _id:teacher_id, //it will checks first 
            },
            updates  //if there updates
        );

        
       
  return res.json(RESPONSE.SUCCESS);



    }catch(err){
            console.log("editTeacher",err);
            return res.json(RESPONSE.UNKNOWN_ERROR);
    
            }
    });

export default router;