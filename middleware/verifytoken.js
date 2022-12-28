const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const model=require("../models");

dotenv.config();


const Verifyjwttoken=async (token,role)=>{ 
    try {   
        const verified =await jwt.verify(token, process.env.JWT_SECRET_KEY);  
        if(verified){ 
         const data=  await model.User.findAll({
                where:{
                    id:verified.id
                }
            }).then(result=>{ 
                if(result.length!=0){ 
                    if(result[0].userrole==role){ 
                        return {status:1,data:result[0].id}
                }else{ 
                    return {status:0,err:"Unautherized User"}
                }
                }else{ 
                    return {status:0,err:"User Not Found"}
                }
            }).catch(err=>{
                console.log(res.err)
                return {status:0,data:"Database Error"}
            })  
            return data;
        }
    } catch (error) { 
        console.log(error)
        return {status:0,err:"something went wrong.please check console"} 
    }
}

module.exports=Verifyjwttoken;