const {Router}=require("express");
const Verifyjwttoken = require("../middleware/verifytoken");
const model=require("../models");

const workerroute=Router();

workerroute.use("/",(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).json({message:"Auth Token Not Found"})
    }
    let token =req.headers.authorization.split(' ')[1]; 
     Verifyjwttoken(token,process.env.WORKER_ROLE).then(result=>{  
        if(result.status){ 
            req.id=result.data;
            next();
        }else{
            return res.status(400).json({message:result.err})
        }
     });  
})

workerroute.post("/createlog",async(req,res)=>{
    if(!req.body || !req.body.starttime || !req.body.endtime || !req.body.remark){
       return res.status(400).json({message:"Invalid Data"})
    }  
   await model.Logs.create({userid:req.id,starttime:req.body.starttime,endtime:req.body.endtime,remark:req.body.remark}).then(result=>{
        console.log(result)
        res.status(200).json({message:"Log Inserted Successfully"})
   }).catch(err=>{ 
       console.log(err)
       res.status(400).json({message:"Database Error"})
   })  
})

workerroute.put("/createlog",async(req,res)=>{
    if(!req.body || !req.body.starttime || !req.body.endtime || !req.body.remark || !req.body.id){
       return res.status(400).json({message:"Invalid Data"})
    }  
   await model.Logs.update({starttime:req.body.starttime,endtime:req.body.endtime,remark:req.body.remark},{where:{id:req.body.id,userid:req.id}}).then(result=>{
        if(result[0]){ 
            res.status(200).json({message:"Log Updated successfully"})
        }else{
            res.status(400).json({message:"something went wrong"}) 
        }
   }).catch(err=>{ 
       console.log(result.err)
       res.status(400).json({message:"Database Error"})
   })  
})

workerroute.get("/mylog",(req,res)=>{
    model.Logs.findAll({
        where:{
            userid:req.id
        }
    }).then(result=>{
        console.log(result)
        res.status(200).json({data:result.data})
    }).catch(err=>{ 
        console.log(result.err);
        res.status(400).json({message:"Database Error"})
    }) 
})


module.exports=workerroute;