import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        //compass
        const url="mongodb://127.0.0.1:27017/internship_db"   //loacalhost=127.0.0.1
        await mongoose.connect(url);

        //atlas
        //const url="mongodb+srv://Shwetha:ShwethaClustor_09@cluster0.5k2iu9f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        //await mongoose.connect(url),{dbname:"internship_db"});
        console.log("Connected to DB");

    }catch(err){
        console.log(err);
        console.log("Error while connecting DB");
    }
};
export default connectDB;