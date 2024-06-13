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
}

};