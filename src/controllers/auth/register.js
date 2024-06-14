import express from "express";
import initTeacherModel from "../../model/teacherModel.js";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import validator from "validator";
import bcrypt from "bcrypt";
import constants from "../../config/constants.js";


router.post("/", async (req, res) => {  //req= requesting data from frontend side and responsing to the front end in json format
  //in express we have router which is used to use http methods
  try {
    const teacherModel = await initTeacherModel();
    const { teacher_name, email, phone, password } = req.body; //we are requesting data from postman body.
    let response;

    if (!teacher_name || teacher_name == "") {
        response=RESPONSE.MANDATORY_PARAMS;
   
        return res.json({  //sending data using json format
        code: response.code, //fetching data or code and storing to response global variable
        message: "teacher name" + response.message,
      });
    }

    if (!email || email == "") {
        response=RESPONSE.MANDATORY_PARAMS;
   
        return res.json({  //sending data using json format
        code: response.code, //fetching data or code and storing to response global variable
        message: "email" + response.message,
      });
    }

    if (!phone || phone == "") {
        response=RESPONSE.MANDATORY_PARAMS;
   
        return res.json({  //sending data using json format
        code: response.code, //fetching data or code and storing to response global variable
        message: "phone" + response.message,
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

    const isExistingEmail=await teacherModel.find({   //find()method
      is_active : constants.STATE.ACTIVE,
      email:email,
  });
    
console.log(isExistingEmail);
if (isExistingEmail.length>0){  //.length bcz we took find() which represents in array so to access .length
  response=RESPONSE.ALREADY_EXISTS;
        return res.json({  //sending data using json format
            code: response.code, //fetching data or code and storing to response global variable
            message: "email" + response.message,
          });
}
    


 

    const isValidPhone= validator.isMobilePhone(phone) && phone.toString().length==10;
    console.log(isValidPhone);
    if(isValidPhone==false){
        response=RESPONSE.INVALID_DATA;
        return res.json({  //sending data using json format
            code: response.code, //fetching data or code and storing to response global variable
            message: "phone" + response.message,
          });
    }  //install validator

    const isExistingPhone=await teacherModel.find({   //find()method
      is_active : constants.STATE.ACTIVE,
      phone:phone,
  });
    
console.log(isExistingPhone);


if (isExistingPhone.length>0){  //.length bcz we took find() which represents in array so to access .length
  response=RESPONSE.ALREADY_EXISTS;
        return res.json({  //sending data using json format
            code: response.code, //fetching data or code and storing to response global variable
            message: "phone" + response.message,
          });
}



//install bcrypt library for password validation
const encryptedPassword= await bcrypt.hash(password, constants.HASH_ROUND);  //bcrypt.hash will enable u to add constant file to represen thow much round it should encrypt
//console.log(encryptedPassword); //u get encrypted pass in terminal we will do use that in database

await teacherModel.create({  //storing
    teacher_name:teacher_name,  //name given in db
    phone: phone,
    email:email,
    password: encryptedPassword,
});

    return res.json(RESPONSE.SUCCESS); //for success

  } catch (err) {
    console.log(err);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
