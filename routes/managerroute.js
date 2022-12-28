const {Router}=require("express");
const Verifyjwttoken = require("../middleware/verifytoken");
 
const model=require("../models")

const managerroute=Router();

managerroute.use("/",(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).json({message:"Auth Token Not Found"})
    }
    let token =req.headers.authorization.split(' ')[1]; 
     Verifyjwttoken(token,process.env.MANAGER_ROLE).then(result=>{  
        if(result.status){ 
            req.id=result.data;
            next();
        }else{
            return res.status(400).json({message:result.err})
        }
     });  
})
 
managerroute.get("/getworkers",async(req,res)=>{
    await model.User.findAll({
        where:{
            managerid:req.id
        }
    }).then(result=>{
        if(result.length==0){
            res.status(200).json({message:"No worker Found"})
        }else{ 
            result.map(value=>{

            })
            delete result.password;
            res.status(200).json({data:result})
        }
    }).catch(err=>{
        console.log(err)
        res.status(400).json({message:"Database Error"})
    })
    
})

managerroute.put("/updateworklog",async(req,res)=>{
    if(!req.body || !req.body.starttime || !req.body.endtime || !req.body.remark || !req.body.id){
        return res.status(400).json({message:"Invalid Data"})
     }  
     await model.Logs.update({starttime:req.body.starttime,endtime:req.body.endtime,remark:req.body.remark},{
        where:{
            id:req.body.id
        }
     }).then(result=>{
        if(result[0]){
            res.status(200).json({message:"Log Updated successfully"})
        }else{
            res.status(400).json({message:"something went wrong"})
        }
     }).catch(err=>{
        console.log(err)
        res.status(400).json({message:"Database Error"})
    })
})


managerroute.get("/workerlog",async(req,res)=>{  

    await model.Logs.findAll({
        include:{
            model:model.User,
            where:{
                managerid:req.id
            }
        }
    }).then(result=>{ 
        res.status(200).json({data:result})
    }).catch(err=>{
        console.log(err)
        res.status(400).json({message:"Database Error"})
    })  
})


module.exports=managerroute;