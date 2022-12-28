const {Router}=require("express");
const bcrypt =require("bcrypt");
const jwt =require('jsonwebtoken')
const dotenv=require('dotenv');
const model = require("../models"); 

dotenv.config();

const authroute =Router();

const GenerateToken=(data)=>{
    const token=jwt.sign(data, process.env.JWT_SECRET_KEY);
    return token;
}

const SendJsonres=(res,code,data)=>{
    return res.status(code).json(data)
 }

 
authroute.post("/signup",async(req,res)=>{  
    if(!req.body || !req.body.username || !req.body.email || !req.body.password || !req.body.userrole){
        return SendJsonres(res,400,{message:"Invalid Data"}) ; 
    } 
    if(req.body.userrole!=process.env.WORKER_ROLE && req.body.userrole!=process.env.MANAGER_ROLE){
        return SendJsonres(res,401,{message:" UserRole Invalid"}) ; 
    } 
    await model.User.findAll({
        where:{
            email:req.body.email
        }
    }).then(async(result)=>{
        if(result.length!=0){
            result.map(value=>{
                let comparepass=bcrypt.compareSync(req.body.password,value.password);
                if(comparepass){   
                    return SendJsonres(res,400,{message:"User Already Have An account"}) ; 
                }
            })
        } 
        let password = bcrypt.hashSync(req.body.password,5); 
        if(!req.body.managerid){
            req.body.managerid=null;
        } 
        await model.User.create({
            username:req.body.username,
            managerid:req.body.managerid,
            email:req.body.email,
            password:password,
            userrole:req.body.userrole
        }).then(r=>{ 
            let data={
                time:Date(), 
                id:r.dataValues.id
            };
            let token= GenerateToken(data);
            return SendJsonres(res,200,{token:token,message:"User Added Successfully"}) ; 
        }).catch(err=>{
            console.log(err)
            return SendJsonres(res,200,{message:"Database Error"});  

        }) 
    }).catch(err=>{
        console.log(err,"error")
        return SendJsonres(res,200,{message:"Database Error"});   
    })        
})

authroute.post("/login",async(req,res)=>{
    if(!req.body || !req.body.email || !req.body.password){  
        return SendJsonres(res,400,{message:"Invalid Data"}) ;  
    }
    await model.User.findAll({
        where:{
            email:req.body.email
        }
    }).then(result=>{
        if(result.length!=0){
           result.map(value=>{
                let compare=bcrypt.compareSync(req.body.password,value.password);
                if(compare){
                    let data={
                        time:Date(),
                        id:value.id
                    };
                    let token= GenerateToken(data);
                   return SendJsonres(res,200,{token:token,message:"User logged successfully"})
                }else{
                    return SendJsonres(res,400,{message:"Invalid password"}) ; 
                }
           })
        }else{
            return SendJsonres(res,400,{message:"User Not Found"}) ;   
        }
    }).catch(err=>{
        console.log(err);
        return SendJsonres(res,200,{message:"Database Error"});   
    })

})


module.exports=authroute;