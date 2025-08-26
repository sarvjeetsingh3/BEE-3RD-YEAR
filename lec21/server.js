const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const User = require("./model/user"); //  correct path

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(user)

function isLogin(reqq,res,login){
    let token= req.header.authorization
    console.log(token);
}


// Health check
app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server running ok "
    });
});s

app.get("/home",isLogin,(req,res)=>{
 let username;
    res.json({
        success:true,
        message:"welcome" + username
    })
})


// Signup
app.post("/api/users/signup", async (req, res) => {
    console.log(" Signup request:", req.body); //  Debug log
    try {
        const { name, email, password } = req.body;

        // check if user already exists
        let userExist = await User.findOne({ email });
        if (userExist) {
            return res.json({
                success: false,
                message: "User already exists with this email, please login"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        let newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.json({
            success: true,
            message: "User registered successfully, please login to continue"
        });
    } catch (error) {
        console.log(" Signup error:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Login
app.post("/api/auth/login", async (req, res) => {
    console.log(" Login request:", req.body); //  Debug log
    try {
        const { email, password } = req.body;

        let userExist = await User.findOne({ email });
        if (!userExist) {
            return res.json({
                success: false,
                message: "User does not exist, please signup"
            });
        }

        // check password
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password, please try again"
            });
        }

        // generate token
        const token = jwt.sign({ userId: userExist._id }, "okkk", { expiresIn: "1h" });

        res.json({
            success: true,
            message: "Login successful",
            token
        });
    } catch (error) {
        console.log(" Login error:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/blogapp")
    .then(() => console.log(" Connected to MongoDB"))
    .catch(err => console.log(" DB error:", err.message));

// Start server
app.listen(3344, () => {
    console.log(" Server is running on port 3344");
});
