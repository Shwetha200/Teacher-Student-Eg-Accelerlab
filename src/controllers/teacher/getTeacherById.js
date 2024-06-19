import express, { response } from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import initTeacherModel from "../../model/teacherModel.js";

//authenticate is not required for teacher
router.get("/:id", async (req, res) => { //get method is used to listing 
    try{
        const teacherModel=await initTeacherModel();
        let response;
        const teacher_id=req.params.id;

        let data=await teacherModel.findOne({   //fineOne()method for all not array
            is_active:constants.STATE.ACTIVE,  //whose is_Active=1 thatt should be displayed. but we need only authenticated
            _id:teacher_id,
        });

        if(data){
            data={  //to get only needed data instead of is_active:1 and all
                    _id:data._id,
                    teacher_name:data.teacher_name,
                    email:data.email,
                    phone:data.phone,

            };
            response=RESPONSE.SUCCESS;
            return res.json({
                //sending data using json format
                code: response.code, //fetching data or code and storing to response global variable
                message:  response.message,
                data:data,
              });
        }else{
            response.RESPONSE.NOT_FOUND;
            return res.json({
                //sending data using json format
                code: response.code, //fetching data or code and storing to response global variable
                message:  "teacher" + response.message,
            });
        }
    }
    catch(err){
        console.log("listTeacher",err);
        return res.json(RESPONSE.UNKNOWN_ERROR);

        }
});

export default router;
    