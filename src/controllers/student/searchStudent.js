import express, { response } from "express";
const router = express.Router();
import {RESPONSE} from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import initStudentModel from "../../model/studentModel.js";


router.get("/:search_key", authenticate, async (req, res) => { //get method is used to listing 
    try{
        //for pagination
        // let page=Number(req.query.page)?Number(req.query.page):1;
        // let limit=Number(req.query.limit)?Number(req.query.limit):10; //how many values should come in one page

        //for search
        // let search_key=req.query.search_key  //use query when u need to send multiple values //use filter instead search //search and filter are the same using it differently
        let search_key=req.params.search_key;

        const studentModel=await initStudentModel();
        const teacher_id=req.user.id;
        let response;
        let data=await studentModel.find({   //fineOne()method for all not array
            is_active:constants.STATE.ACTIVE,  //whose is_Active=1 thatt should be displayed. but we need only authenticated
            teacher_id:teacher_id,
            $or:[
            {student_name:{$regex :search_key,$options : "i"}},
            {rollno:{$regex :search_key}},
            ]
            // student_name:{$regex :search_key,$options:"i"}, // to retrieve only student_name otherwise or used.//i=  case insensitive
            //rollno:{$regex :search_key},
        });

        // .skip((page-1)*limit)   //for pagination skip and limit are inbuilt methods of mongodb. //skip will skipp the values given
        // .limit(limit); //limit will limit the values for a page.   //in postman given values 5 for limit in one page, mongodb returns only 5 values first added in one page 

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
                    rollno:item.rollno,
                    image:item.image.map((img)=>"/uploads/"+img),  //mapping img again bcz it is in array
                    //path before uploads in index.js file
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
        console.log("listStudent",err);
        return res.json(RESPONSE.UNKNOWN_ERROR);

        }
});
export default router;