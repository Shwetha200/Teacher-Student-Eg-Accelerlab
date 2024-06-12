import express from "express";

const app=express();

import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/helper/datatbaseConnection.js"

const PORT=process.env.PORT||3000

app.use(express.json());
app.use(express.urlencoded({extended:true}));// through this 2 codes, we will get request from body in postman
connectDB(); //function called

app.listen(PORT,()=>{
    console.log("server listening on",PORT);
});