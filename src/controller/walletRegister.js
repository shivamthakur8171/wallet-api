const wallet = require('./../model/wallet');

module.exports.walletReg = async (req, res) => {
    try {
        const userDetail = req.userDetail;
        // console.log(userDetail._id);
        const walletData = await wallet.findOne({ userId: userDetail._id });
        // console.log(walletData);
        if (walletData == null) {
            const createWallet = new wallet({
                userId: userDetail._id
            })
            createWallet.save();
            res.status(200).send( "wallet is created please verify the wallet");
        } else {
            res.status(200).send("wallet is already created please  verify the wallet");
        }
    } catch (err) {
        console.log(err);
    }
}