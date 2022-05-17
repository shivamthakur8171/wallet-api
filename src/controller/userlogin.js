const login = require('./../model/login');
const register = require('./../model/user');
const helper = require('./../helper/helper')

module.exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await register.findOne({ email });
        // console.log(findUser);
        const loginUser = await login.findOne({userId : findUser._id});
        // console.log(loginUser);
        if (!findUser) return res.status(400).send("email is not match or incorrect e mail");

        if (req.cookies.jwt) return res.status(400).send("you are already login Plz logout");

        const isMatch = await helper.comparePassword(password, findUser.password);
        // console.log(isMatch);
        if (!isMatch) return res.status(400).send("password not match");

        const token = helper.jwtToken(findUser._id);
        // console.log(token);
        loginUser.tokens = loginUser.tokens.concat({token:token});
        
        res.cookie("jwt", token);
        await loginUser.save();

        res.status(200).send({
            msg: "you are successfully login!",
            token
        });
    } catch (err) {

    }
}