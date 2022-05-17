const fraudTransaction = require('./../model/fraudTransaction');
const wallet = require('./../model/wallet');
const transaction = require('./../model/transaction');
const register = require('./../model/user');


module.exports.checkFraudTransaction = async (req, res) => {
    try {
        const transactions = req.body.transactionId;
        // console.log(transactions);
        const transactionDetail = await fraudTransaction.findOne({ transactionId: transactions }).populate("transactionId")
        // console.log(transactionDetail);
        const amount = transactionDetail.transactionId.amount;
        const mobile = transactionDetail.transactionId.mobile;
        const user = transactionDetail.transactionId.userId;
        const fraud = transactionDetail.isFraud
        // console.log(amount, mobile , user);

        if (fraud === true) {
            res.status(201).send("issue is already resolved");
        } else {
            const newAmount = parseFloat(-amount)
            const updateWallet = await wallet.findOne({ userId: user })
            const walletUpdate = updateWallet.wallet + newAmount
            // console.log(walletUpdate);

            const walletUpdateData = await wallet.updateOne({ userId: user }, {
                $set: {
                    wallet: walletUpdate,
                    updatedAt: Date.now()
                }
            });
            console.log(walletUpdateData);
            const transactionData = await transaction.create({
                userId: user,
                amount: "+" + newAmount,
                comment: "refund by paytm ",
            });
            // console.log(transactionData);

            const updateWallet1 = await register.findOne({ mobile });
            // console.log(updateWallet1)
            const user1 = updateWallet1._id.toString();
            // console.log(user1);

            const updateData = await wallet.findOne({ userId: user1 });
            console.log(updateData);
            const walletUpdate1 = updateData.wallet - newAmount;
            console.log(walletUpdate1);

            const walletUpdateData1 = await wallet.updateOne({ userId: user1 }, {
                $set: {
                    wallet: walletUpdate1,
                    updatedAt: Date.now()
                }
            });

            const transactionData1 = await transaction.create({
                userId: user1,
                amount: "-" + newAmount,
                comment: "amount dectuct because it is fraud transaction",
            });

            const data = await fraudTransaction.findOneAndUpdate({ transactionId: transactions }, { isFraud: true })
            console.log(data.isFraud);

            res.status(201).send("refund Completed");
        }
    } catch (err) {
        console.log(err);
    }
}