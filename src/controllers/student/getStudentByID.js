import express, { response } from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initStudentModel from "../../model/studentModel.js";


router.get("/:id", authenticate, async (req, res) => { //get method is used to listing 
    try{
        const studentModel=await initStudentModel();
        const teacher_id=req.user.id;
        let response;
        const student_id=req.params.id;

        let data=await studentModel.findOne({   //fineOne()method for all not array
            is_active:constants.STATE.ACTIVE,  //whose is_Active=1 thatt should be displayed. but we need only authenticated
            teacher_id:teacher_id,
            _id:student_id,
        });

        if(data){
            data={  //to get only needed data instead of is_active:1 and all
                    _id:data._id,
                    student_name:data.student_name,
                    rollno:data.rollno,
                    image:data.image.map((img)=>"/uploads/"+img),  //mapping img bcz it is in array
                    //path before uploads in index.js file 

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
                message:  "students" + response.message,
            });
        }
    }
    catch(err){
        console.log("listStudent",err);
        return res.json(RESPONSE.UNKNOWN_ERROR);

        }
});

export default router;
    