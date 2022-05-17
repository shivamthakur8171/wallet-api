const mongoose = require("mongoose");
var ip = require("ip");

// create a schema for user registration
const loginSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    email :{
        type: String
    },
    tokens: [
        {
            token: {
                type: String,
            },
            ip: {
                type: String,
                default: ip.address()
            }
        }
    ]
}, { timestamps: true });


// create a collection using Models
module.exports = new mongoose.model("login", loginSchema);