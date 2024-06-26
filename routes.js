//writing function here to connect and this is called in index file
import express from "express";
import registerApiHandler from "./src/controllers/auth/apiHandler.js";
import studentApiHandler from "./src/controllers/student/apiHandler.js";
import teacherApiHandler from "./src/controllers/teacher/apiHandler.js";




const routes = (app) => {
  app.use(express.json());
  app.use("/api/auth", registerApiHandler);
  app.use("/api/student", studentApiHandler);   //this should be used in url of postman
  app.use("/api/teacher", teacherApiHandler); 
};

export default routes;
