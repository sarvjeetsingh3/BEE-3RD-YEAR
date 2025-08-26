const express=require('express');
const app=express();
const fs=require('fs');
app.use(express.static+(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));
app.listen(8000,()=>{
    console.log("server started");
})
app.get("/users",(req,res)=>{
    fs.readFile("./user.json","utf-8",function(err,data){
        if(err)res.send(err);
        let alluser=JSON.parse(data);
        res.json(alluser);
    })
})
app.post("/adduser",(req,res)=>{
    let name=req.body.name;
    let username=req.body.username;
    let newUser={
        name:name,
        username:username,
        role:"user"
    }
    let alluser=[];
    let data =fs.readFileSync("./user.json","utf-8");
    if(data){
        alluser=JSON.parse(data);
    }
    alluser.push(newUser);
    fs.writeFileSync("./user.json",JSON.stringify(alluser));
    if(err)res.send(err);
})
