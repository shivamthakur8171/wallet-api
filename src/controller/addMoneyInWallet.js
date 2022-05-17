const wallet = require('./../model/wallet');
const transaction = require('./../model/transaction');

module.exports.addMoneyInWallet = async (req, res) => {
    try {
        const userDetail = req.userDetail;
        const money = req.body.wallet;
        // console.log(userDetail._id,money);
        if (money < 1) {
            return res.status(401).send("You can not Add money less than 1");
        };
        const walletData = await wallet.findOne({ userId: userDetail._id });
        // console.log(walletData.wallet);
        const currentMoney = walletData.wallet + money
        // console.log(currentMoney);
        const walletUpdate = await wallet.findOneAndUpdate({ userId: userDetail._id }, {
            $set: {
                wallet: currentMoney,
                updatedAt: Date.now()
            }
        });
        // console.log(walletUpdate, "hello");
        const transactionData = await transaction.create({
            userId: userDetail._id,
            amount: "+" + money,
            to: userDetail.firstName + " " + userDetail.lastName,
            mobile: userDetail.mobile,
            paidAt: Date.now()
        })
        // console.log(transactionData, "hiiii");
        transactionData.save();
        res.status(201).json("money add successfully in the wallet");

    } catch (err) {
        console.log(err);
    }
}