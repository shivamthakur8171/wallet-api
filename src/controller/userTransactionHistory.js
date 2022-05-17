const transaction = require('./../model/transaction');

module.exports.userTransactionHistory = async (req, res) => {
    try {
        const userDetail = req.userDetail;
        const walletData = await transaction.find({ userId: userDetail._id });
        // console.log(walletData);
        if (walletData == null) {
            res.status(401).send("there is no transaction history.");
        }
        res.send({ status: 200, data: walletData })
    } catch (err) {
        console.log(err);
    }
}