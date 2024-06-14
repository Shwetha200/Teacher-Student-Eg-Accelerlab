import express from "express";
import initTeacherModel from "../../model/teacherModel.js";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import constants from "../../config/constants.js";


router.post("/", async (req, res) => {  //req= requesting data from frontend side and responsing to the front end in json format
  //in express we have router which is used to use http methods
  try {
    const teacherModel = await initTeacherModel();
    const { email, password } = req.body; //we are requesting data from postman body.
    let response;


    if (!email || email == "") {
        response=RESPONSE.MANDATORY_PARAMS;
   
        return res.json({  //sending data using json format
        code: response.code, //fetching data or code and storing to response global variable
        message: "email" + response.message,
      });
    }


    if (!password || password == "") {
        response=RESPONSE.MANDATORY_PARAMS;
   
        return res.json({  //sending data using json format
        code: response.code, //fetching data or code and storing to response global variable
        message: "password" + response.message,
      });
    }


    const isValidEmail= validator.isEmail(email);  //install validator
    console.log(isValidEmail);
    if(isValidEmail==false){
        response=RESPONSE.INVALID_DATA;
        return res.json({  //sending data using json format
            code: response.code, //fetching data or code and storing to response global variable
            message: "email" + response.message,
          });
    }  //install validator

    const data=await teacherModel.findOne({   //findOne()method: data will come in the way of single object //checking whether it is active or not
      is_active : constants.STATE.ACTIVE,
      email:email,
  });
    
//console.log(data);
if(data && (await bcrypt.compare(password, data.password))){
    const token=jwt.sign({  // sign() method is in-built method of jsonwebtoken, it validates and convert our given data to token
    id:data._id,
    name: data.teach_name, //data. = becz fetching from data
    },
    process.env.TOKENKEY
); //role = is used distinct separate modules for permission
      
  response=RESPONSE.SUCCESS;
    return res.json({
        //sending data using json format
            code: response.code, //fetching data or code and storing to response global variable
            message:  response.message,
            data:token,
    });  //send in postman u will get token for name and id

}else{
    response=RESPONSE.INVALID_DATA;
    return res.json({  //sending data using json format
        code: response.code, //fetching data or code and storing to response global variable
        message: "login credential" + response.message,
      });
}
    

  } catch (err) {
    console.log(err);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
