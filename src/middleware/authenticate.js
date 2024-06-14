//sometimes without token tries to hit (post)  or invalid token, so, to prevent that using this function
import jwt from "jsonwebtoken";
import { RESPONSE } from "../../src/config/global.js";
import { response } from "express";

const authenticate = (req, res, next) => {
  //other api functionalities sholud not harm other files and it should work go to next functionalities so used next to move without any harm
  const token = req.headers["authorization"];
  if (!token) {
    return res.json(RESPONSE.ACCESS_DENIED);
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKENKEY);
    req.user = decoded;
    next();
  } catch (err) {
    response = RESPONSE.INVALID_DATA;

    return res.json({
      //sending data using json format
      code: response.code, //fetching data or code and storing to response global variable
      message: "access-token" + response.message,
    });
  }
};

export default authenticate;
