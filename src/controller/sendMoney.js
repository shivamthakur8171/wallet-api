const wallet = require('./../model/wallet');
const register = require('./../model/user');
const transaction = require('./../model/transaction');

module.exports.sendMoney = async (req, res) => {
    try {
        const userDetail = req.userDetail;
        const mobile = req.body.mobile;
        const money = req.body.money;
        // console.log(userdetail,mobile,money)
        if (userDetail.mobile == mobile) {
            return res.status(401).send("You can not send money to your self");
        }
        if (money <= 1) {
            return res.status(401).send("You can not send money less than 1");
        };
        const walletData = await wallet.findOne({ userId: userDetail._id });
        // console.log(walletData.wallet);
        if (walletData.wallet < money) {
            return res.status(401).send("You Don't have sufficient Balance in your Accont Plz check Your Balance");
        };
        const receiver = await register.findOne({ mobile: mobile });
        // console.log(receiver._id);
        const receiverData = await wallet.findOne({ userId: receiver._id });
        // console.log(receiverData);
        if (receiverData == null) {
            return res.status(401).send("User Don't have a wallet account so you cannot send money to the user");
        };
        if (receiverData.status == false) {
            return res.status(401).send("User Wallet is not activated so you can not send money to the user");
        };

        const sendMoney = walletData.wallet - money;
        const walletUpdate = await wallet.findOneAndUpdate({ userId: userDetail._id }, {
            $set: {
                wallet: sendMoney,
                updatedAt: Date.now()
            }
        });
        const transactionData = await transaction.create({
            userId: userDetail._id,
            amount: "-" + money,
            to: receiver.firstName + " " + receiver.lastName,
            mobile: receiver.mobile,
            paidAt: Date.now(),
            from: userDetail.firstName + " " + userDetail.lastName
        });

        const receiveMoney = receiverData.wallet + money;
        await wallet.findOneAndUpdate({ userId: receiver._id }, {
            $set: {
                wallet: receiveMoney,
                updatedAt: Date.now()
            }
        });
        const transactionData1 = await transaction.create({
            userId: receiver._id,
            amount: "+" + money,
            from: userDetail.firstName + " " + userDetail.lastName,
            mobile: userDetail.mobile,
            // to: receiver.firstName + " " + receiver.lastName,
            paidAt: Date.now()
        });
        res.status(201).send("Money send successfully");

    } catch (err) {
        console.log(err);
    }
}