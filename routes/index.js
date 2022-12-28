const { Router }=require("express");
const authroute = require("./authroute");
const managerroute = require("./managerroute");
const workerroute = require("./workerroute");

const route=Router();

route.use("/auth",authroute);
route.use("/worker",workerroute);
route.use("/manager",managerroute);

module.exports=route;   
