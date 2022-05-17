const wallet = require('./../model/wallet');

module.exports.walletActivate = async (req, res) => {
    try {
        const userDetail = req.userDetail;
        // console.log(userDetail._id);
        const walletData = await wallet.findOne({ userId: userDetail._id });
        // console.log(walletData.status);
        if (walletData.status == true) {
            res.status(200).send("Wallet Already Activated please use the wallet")
        } else {
            const walletData = await wallet.findOneAndUpdate({ userId: userDetail._id }, { status: true });
            res.status(200).send("Wallet Activate Successfully");
        }
    } catch (err) {
        console.log(err);
    }
}