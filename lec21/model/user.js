const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true   // ✅ correct spelling
    },
    email: {
        type: String,
        required: true   // ✅ correct spelling
    },
    password: {
        type: String,
        required: true   // ✅ correct spelling
    },
    blog_count: {
        type: Number,
        default: 0
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blog"
        }
    ],
    created_At: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);
