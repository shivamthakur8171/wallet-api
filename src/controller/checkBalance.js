const wallet = require('./../model/wallet');


module.exports.checkBalance = async (req, res) =>{
    try{
        const userDetail = req.userDetail;
        // console.log(userDetail);
        const balance = await wallet.find({ userId: userDetail._id });
        // console.log(balance[0].wallet);
        res.status(201).send(`Avalable Balance : ${balance[0].wallet}`);
    }catch(err){
        console.log(err);
    }
}