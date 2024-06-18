export const RESPONSE={

//if code success this will be reused and some errors //this is used in register file and we can create like this
SUCCESS:{
    code:"400",
    message: "Everything worked as expected",

},
UNKNOWN_ERROR:{
    code:"500",
    message: "Something went wrong",

},
MANDATORY_PARAMS:{
    code:"201",
    message:"is mandatory params",
},
INVALID_DATA:{
    code:"202",
    message:"is invalid",
},
ALREADY_EXISTS:{
    code:"203",
    message:"already exists",

},
ACCESS_DENIED:{
    code:"204",
    message:"access-denied",

},
MULTER_ERR:{
    code:"205",
    message:"file-size exceeded",    //these errors for front end side, to our side givr in console.log

},
NOT_FOUND:{
    code:"206",
    message:"not found",

},
};