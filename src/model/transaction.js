const mongoose = require ('mongoose');

const transactionSchema = new mongoose.Schema({
    userId : String,
    amount : {
        type: String,
        required : true
    },
    to : {
        type : String,
    },
    mobile :{
        type : Number
    },
    from : {
        type : String
    },
    comment : String
},{timestamps : true});

module.exports = new mongoose.model("transaction",transactionSchema);

 