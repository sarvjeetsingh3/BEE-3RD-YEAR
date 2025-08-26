const express = require("express");
const fs=require("fs")
const app = express();
const PORT = 3000;
app.use(express.json());




app.post("/users", (req, res) => {
    let allUser=[];
    let name=req.body.name;
    let password=req.body.password;
    let user=(name,password);
    console.log(user)
    fs.appendFile("./userdqata.json",JSON.stringify(user),function(err){
        if(err) return res.send(err);
        res.send("user added")
    })
        res.json({
        name:name,
        password:password
        
    })
  
  console.log(req.body);

});

   fs.appendFile("user.txt", userData + "\n", (err) => {
    if (err) {
      console.error("Error writing to file", err);
      return res.status(500).send("Failed to save data");
    }

    console.log("Data written to user.txt:", userData);
    res.send("Data saved to file successfully");
  });


app.listen(3000,()=>{
    console.log("server started")
})
