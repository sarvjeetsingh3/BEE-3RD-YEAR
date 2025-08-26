const bodyParser = require('body-parser');
const express = require('express')
const mongoose=require("mongoose")
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const Blogs=require(("./model/User"))
app.post("/blogs",async(req,res)=>{
    let{title,body}=req.body;
    let newBlog=new Blogs({
        title:title,
        body:body,
        data: new Data.now()
    })

  await  newBlog.save()
  res.json({   
     success:true,
    data:newBlog,
    mesaage :"blog Added"
})
})
app.get("/blogs",async(req,res)=>{
    let allblog=await Blogs.find();
    res.json({
        success:true,
        data:allblog,

    })
})
app.get("/Blogs/:id",async(req,res)=>{
    let {id}= req.params
    let blogs= await Blogs.findone({_id:id})
;
res.json({
    success:true,
    data:blog
})

})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
mongoose.connect('mongodb://127.0.0.1:27017/G26DATABASE')
  .then(() => console.log('Connected!')); 