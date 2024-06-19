import express, { response } from "express";
const router = express.Router();
import {RESPONSE} from "../../config/global.js";
import constants from "../../config/constants.js";
import initTeacherModel from "../../model/teacherModel.js";


router.get("/", async (req, res) => { //get method is used to listing 
    try{
        const teacherModel=await initTeacherModel();
        let response;
        let data=await teacherModel.find({   //fineOne()method for all not array
            is_active:constants.STATE.ACTIVE,  //whose is_Active=1 thatt should be displayed. but we need only authenticated
        });

        if(data.length==0){
            response = RESPONSE.NOT_FOUND;
         return res.json({
          //sending data using json format
          code: response.code, //fetching data or code and storing to response global variable
          message: "teacher" + response.message,
        });
        }else{
            data=data.map((item)=>{ //if array(find()method) map is used. If wanted to send only needed data to frontend map is used
                return{
                    _id:item._id,
                    teacher_name:item.teacher_name,
                    email:item.email,
                    phone:item.phone,
                    
                   
                };
            });
            response = RESPONSE.SUCCESS;

        return res.json({
          //sending data using json format
          code: response.code, //fetching data or code and storing to response global variable
          message: response.message,
          data:data,
        });
        }

    }catch(err){
        console.log("teacherList",err);
        return res.json(RESPONSE.UNKNOWN_ERROR);

        }
});
export default router;