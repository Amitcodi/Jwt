const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose =require("mongoose");
const zod=require("zod");
const app=express();
app.use(express.json());
const scode="123456";


const userschema=zod.object({
    usernameschema:zod.string(),
    emailschema:zod.string().email(),
     passschem:zod.string().min(6)
})
mongoose.connect("mongodb+srv://mrkashyapamit:Amit12345@cluster0.xfmvnpv.mongodb.net/newdata");
const User=mongoose.model("userdetails",{username:String,email:String,password:String});

app.post("/sign",async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const email=req.body.email;

    const user=userschema.safeParse({
        username:username,
        password:password,
        email:email
    })
    const existuser=await User.findOne({email:email});
    if(existuser){
       return res.status(400).send("user exist alredy");
    }
    const users=new User({
        user
    })

    users.save();
   var token= jwt.sign({username:username},scode);
   return  res.json({
        token,
        msg:"user created succefultu"
    })
})
app.listen(3000);

console.log("helooo");