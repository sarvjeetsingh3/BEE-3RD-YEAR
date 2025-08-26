
const express = require('express');
const app = express();
app.use(express.static(__dirname+"/public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json )
//app.get("/",(req,res)=>{
    // res.sendFile(__dirname+"/index.html")
//})
//app.get("/about",(req,res)=>{
  //  res
//})
app.post("/addusers",(req,res)=>{
  //username,password
  let username= req.body.username;
  let password= req.body.password;
  res.json({
    username,
    password
  })
})

app.listen(3000,()=>{
    console.log("server started http://localhost:3000")
});
