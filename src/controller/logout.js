const login = require('./../model/login');

module.exports.logout = async (req, res) => {
    try {
        const userDetail = req.userDetail;
        const token = req.token;
        // console.log(token);
        const id = userDetail._id.toString();
        const logoutToken = await login.findOne({ userId: id })
        const tokens = logoutToken.tokens.filter((item) => {
            return item.token === token
        })
        if(tokens == false){
            return res.status(400).json("please login")
        }
        // console.log(tokens);
        // console.log(logoutToken.tokens);
        logoutToken.tokens = logoutToken.tokens.filter((item) => {
            return item.token != token;
        })
        // console.log(logoutToken.tokens);
        await logoutToken.save();
        res.clearCookie("jwt");

        res.status(200).send("You are logout successfully")
    } catch (error) {
        res.status(404).send(error)

    }
}