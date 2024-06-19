import express from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initStudentModel from "../../model/studentModel.js";

//we don't delete directly from database instead we inactive or disable it so, using put method
//if we use delete then whole will be deleted

router.put("/:id?", authenticate, async (req, res) => { //get method is used to listing   //? will consider id field as optional  //in url we can get particular id of the details.
    try{
        const studentModel=await initStudentModel();
        const teacher_id=req.user.id;
        let response;
        const student_id=req.params.id; //same name as id above


        const isValidId=await studentModel.findOne({
            _id:student_id,
            is_active:constants.STATE.ACTIVE,
            teacher_id:teacher_id,
        });




        if(!isValidId){
            response=RESPONSE.INVALID_DATA;
            return res.json({
               code:response.code,
               message:"ID"+response.message,
            });
        }
        await studentModel.findOneAndUpdate(  //method od mongodb check first 
            {
                _id:student_id, //it will checks first
                is_active:constants.STATE.ACTIVE,  //if it active
            },
            {is_active: constants.STATE.INACTIVE} //then, makes it in-active
        );

        //method od mongodb check first  //code for delete
        // await studentModel.deleteOne(  
        //     {
        //         _id:student_id, //it will checks first
        //         is_active:constants.STATE.ACTIVE,  //if it active
        //     },
        // );

        return res.json(RESPONSE.SUCCESS);


    }catch(err){
        console.log("listStudent",err);
        return res.json(RESPONSE.UNKNOWN_ERROR);

        }
});

export default router;