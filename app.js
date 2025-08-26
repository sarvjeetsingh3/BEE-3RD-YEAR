const express  = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
//For showing css file in server
app.use(express.static(path.join(__dirname,'public')));
//for store data in mongodb
app.use(bodyParser.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/public/form.html');
})
//Making schema
const Schema = mongoose.Schema;
const dataschema = new Schema({
    name:String,
    email:String,
    address:String,
    message:String
})
const Data  = mongoose.model('Data',dataschema);
app.post('/submit',(req,res)=>{
    const {name,email,address,message} = req.body;
    const newData = new Data({
        name,
        email,
        address,
        message
    });
    newData.save();
    res.redirect('/');
})
//mongodb connection
mongoose.connect('mongodb://localhost:27017/',{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log("MongoDB is connected....");
});
//server running
app.listen(port,()=>{
    console.log(`Server is running in ${port}`);
})