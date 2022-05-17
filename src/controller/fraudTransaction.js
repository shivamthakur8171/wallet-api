const fraudTransaction = require('./../model/fraudTransaction')


module.exports.fraudTransactionDetail = async (req, res) => {
    try {
        const userDetail = req.userDetail;
        const transaction = req.body.transactionId;
        // console.log(transaction);
        const users = await fraudTransaction.find();
        // console.log(users.length);
        if (users.length < 1) {
            const fraud = await fraudTransaction.create({
                transactionId: transaction,
                userId: userDetail._id
            })
            res.status(201).send("fraud transaction ticket raise successfully");
        }
        const fraudTicket = await fraudTransaction.findOne({ transactionId: transaction })
        // console.log(fraudTicket);
        if (fraudTicket === null) {
            const fraud = await fraudTransaction.create({
                transactionId: transaction,
                userId: userDetail._id
            })
            res.status(201).send("fraud transaction ticket raise successfully");
        } else {
            res.status(201).send("ticket already raised please check the ticket status");
        }
    } catch (err) {
        console.log(err);
    }
}