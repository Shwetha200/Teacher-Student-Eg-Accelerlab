//writing function here to connect and this is called in index file
import express from "express";
import registerApiHandler from "./src/controllers/auth/apiHandler.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api/auth", registerApiHandler);
};

export default routes;
