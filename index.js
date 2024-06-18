import express from "express";

const app = express();
const __dirname =path.resolve();//img path

import dotenv from "dotenv";
dotenv.config();

import path from "path";//img path

import connectDB from "./src/helper/datatbaseConnection.js";
import routes from "./routes.js";
const PORT = process.env.PORT || 3000;


app.use(express.json());//while posting getting error so used these 2 lines from stackoverflow
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public"))); //img path //after public declared in listDtudent.js

routes(app)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // through this 2 codes, we will get request from body in postman
connectDB(); //function called

app.listen(PORT, () => {
  console.log("server listening on", PORT);
});
