const mongoose = require('mongoose');
var ip = require("ip");

const fraudTransactionSchema = new mongoose.Schema({
    transactionId: {
        type: "ObjectId",
        ref: "transaction"
    },
    userId: {
        type: String,
        requird: true
    },
    isFraud: {
        type: Boolean,
        default: false
    },
    ip: {
        type: String,
        default: ip.address()
    }
}, { timestamps: true });

module.exports = new mongoose.model("fraudTransaction", fraudTransactionSchema);

