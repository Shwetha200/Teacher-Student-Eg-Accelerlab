//both liststudent.js and getStudentById.js in one file called list.js
//bcz front end people should get 2 api for both so, we have to reduce to one by combinig that into one
import express from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import initTeacherModel from "../../model/teacherModel.js";


router.get("/:id?", async (req, res) => { //get method is used to listing   //? will consider id field as optional
    try{
        const teacherModel=await initTeacherModel();
        let response;
        let data;
        const teacher_id=req.params.id;

        if(teacher_id){
            data=await teacherModel.findOne({   //fineOne()method for all not array
                is_active:constants.STATE.ACTIVE,  //whose is_Active=1 thatt should be displayed. but we need only authenticated
                _id:teacher_id,
            });
    
            if(data){
                data={  //to get only needed data instead of is_active:1 and all
                        _id:data._id,
                        teacher_name:data.teacher_name,
                       email:data.rollno,
                      
    
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
            }else{
                data=await teacherModel.find({   //fineOne()method for all not array
                    is_active:constants.STATE.ACTIVE,  //whose is_Active=1 thatt should be displayed. but we need only authenticated
                    teacher_id:teacher_id,
                });
        
                if(data.length==0){
                    response = RESPONSE.NOT_FOUND;
                 return res.json({
                  //sending data using json format
                  code: response.code, //fetching data or code and storing to response global variable
                  message: "students" + response.message,
                });
                }else{
                    data=data.map((item)=>{ //if array(find()method) map is used. If wanted to send only needed data to frontend map is used
                        return{
                            _id:item._id,
                            student_name:item.student_name,
                            email:item.email,
                           
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
        }}
        catch(err){
            console.log("listTeacher",err);
            return res.json(RESPONSE.UNKNOWN_ERROR);
    
            }
    });

export default router;