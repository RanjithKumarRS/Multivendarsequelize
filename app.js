const express=require('express');    
const route = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/",route)

const listener=app.listen(3000,()=>{
    console.log("hi dude, I'm in",listener.address().port )
})