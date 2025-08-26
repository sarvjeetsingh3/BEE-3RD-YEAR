const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true   // ✅ fixed
    },
    email: {
        type: String,
        required: true,  // ✅ fixed
        unique: true     // good to ensure no duplicate emails
    },
    password: {
        type: String,
        required: true   // ✅ fixed
    },
    blog_count: {
        type: Number,
        default: 0
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId, // ✅ safer than mongoose.Types.ObjectId
            ref: "Blog"
        }
    ],
    created_At: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);
