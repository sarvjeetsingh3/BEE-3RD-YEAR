const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const User = require("./model/user"); // ✅ correct path

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server running ok 🚀"
    });
});

// Signup
app.post("/api/users/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let userExist = await User.findOne({ email });
        if (userExist) {
            return res.json({
                success: false,
                message: "User already exists with this email, please login"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

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
        console.log(error.message);
        res.json({ message: error.message });
    }
});

// Login
app.post("/api/auth/login", async (req, res) => {
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
        console.log(error.message);
        res.json({ message: error.message });
    }
});

// Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/blogapp")
    .then(() => console.log("Connected to MongoDB ✅"))
    .catch(err => console.log(err.message));

// Start server
app.listen(3344, () => {
    console.log("Server is running on port 3344");
});
