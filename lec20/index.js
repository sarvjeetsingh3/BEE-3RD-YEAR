const express = require("express")
const app = express();
const fs = require("fs");
const { dirname } = require("path");
const { m1, m2 } = require("./middleware/firstmiddleware");
app.use(express.static(__dirname+"/public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(m1)
//app.use(m2)
app.get("/health",(req,res,next)=>{
    console.log("running")
    res.json({
        status:"ok",
        message:"server running"
    })
    next()
})
app.use(m2)
app.listen(3000, ()=>{
    console.log("Server started")
})