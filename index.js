
import express from "express"
import path from "path"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const uri = "mongodb+srv://adasv9423:XcttjwekIx7ylpII@hi.3lfyjt2.mongodb.net/";
mongoose.connect(uri,{
    dbName:"Backend"
}).then(()=>{
    console.log("connected ")
})
const messageSchema=new mongoose.Schema({
    name:String,
    email:String,
})
const messg=mongoose.model("Messages",messageSchema)
const user=mongoose.model("users",messageSchema)
const app=express()
// app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}))
const users=[]
// app.set("view engine","ejs")
app.get("/form",(req,res)=>{
    res.render("index.ejs",{"name":"Adarsh"})

    // res.json({
    //     "success": "true",
    //     "produtcs" :[],
    // })
})
app.get("/add",async (req,res)=>{
   // res.render("index.ejs",{"name":"Adarsh"})
   await messg.create({name:"Adarsh",email:"sursh@gmail.com"}).then(()=>{
    res.send("added successfully")
   })
})

app.get("/",async(req,res)=>{
    const {name,email}=req.body
    const reg= await user.findOne({email})
    if(!reg){
       return res.redirect("/register")
    }
  await user.create({name,email}).then(()=>{
    res.send("logged in")
   })
   const token=jwt.sign({
    _id:user._id},"absabsabanbnna",
   )
   console.log(token)
})
app.post("/register",async(req,res)=>{
    const {name,email}=req.body
    const reg= await user.findOne({email})
  await user.create({name,email}).then(()=>{
    res.send("logged in")
   })
   const token=jwt.sign({
    _id:user._id},"absabsabanbnna",
   )
   console.log(token)
})
// app.post("/form",async(req,res)=>{
//    // res.render("index.ejs",{"name":"Adarsh"})
//    console.log(req.body)
//    users.push({
//     username:req.body.name,email:req.body.email
//    })
//    await messg.create({name:req.body.name,email:req.body.email}).then(()=>{
//     res.send("added successfully")
//    })

//     // res.json({
//     //     "success": "true",
//     //     "produtcs" :[],
//     // })
// })
app.listen(5000,()=>{
    console.log("server is working")
})



// import * as gf1 from "./features.js"
// import http from "http"
// import fs from "fs"
// fs.readFile("./index.html",()=>{
//     console.log("file read successfully")
// })
// console.log("HELLO WORLD2")
// console.log(gf1.gf)
// const server=http.createServer((req,res)=>{
//     // console.log(req.url);
//     // console.log("Adar")
//     if(req.url=="/"){
//     res.end("noice")
//     }
//     if(req.url=="/about"){
//         res.end("<h1>about</h1>")
//         }

// }
// )
// server.listen(5000,()=>{
//     console.log("Adar")
// })
