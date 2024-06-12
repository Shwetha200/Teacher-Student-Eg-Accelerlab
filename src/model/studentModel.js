import mongoose from "mongoose";

const studentModel={
    student_name:{
        type:String,
        required:true,
    },
    rollno:{
        type:String,
        required:true,
    },
    image:{
        type:[String],  // if multiple data we weill use array
        data:buffer, // images and all will be saved in buffer keyword
        required:true,
    },
    
    teacher_id:{   // to know which student is belongs to which teacher
        type:SchemaType.Types.ObjectId, //it is from mongodb
        ref: "teacherdata",
    },
    is_active:{
        type:String,
        default:1,
    },
};

let student=null; 
const initStudentModel=async()=>{

    try{
        if (student) return student;
        student=mongoose.model("studentModel",studentModel);
        return student;
    }catch(err){
        console.log("student-model",err);

    }
};

export default initStudentModel;