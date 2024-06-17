import express from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";

import image from "../../middleware/uploads.js"; //imported upload as image //just name changed
import { MulterError } from "multer";
const uploads=image.array("image", 2);  //we want multiple imgs so took as array, 2 values given ,postman use name as image

router.post("/", authenticate, async (req, res) => {
  try {
    //from here img code to place img in backend
    let response
    uploads(req,res,async(err)=>{
      if(req.files || req.files==""){  //img as array so representing as files here
        response = RESPONSE.MANDATORY_PARAMS;

        return res.json({
          //sending data using json format
          code: response.code, //fetching data or code and storing to response global variable
          message: "image" + response.message,
        });
      }else if(err instanceof MulterError){
        console.log("MulterErr-", err);
        return res.json(RESPONSE.MULTER_ERR);
      }
      if(err){
        return res.json(RESPONSE.UNKNOWN_ERROR);
      }

      let fileName=[]  //storing got imgs in this file
      if(req.files!=null){
        req.files.forEach((ele)=>{   //taking each one element from array and storing in fileName variable
          fileName,push(ele.filename);
        })
      }
    });
//to here about image

    return res.json(RESPONSE.SUCCESS);
  } catch (err) {
    console.log(err);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});
export default router;
