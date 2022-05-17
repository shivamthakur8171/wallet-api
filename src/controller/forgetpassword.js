const register = require('./../model/user');
const validator = require('./../helper/validator');
const helper = require('./../helper/helper');

module.exports.forgetPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        // console.log(email);

        // find user in db
        const useremail = await register.findOne({ email: email });
        // console.log(useremail)

        if (!useremail) {
            return res.status(400).send("user with this email does not exist")
        }

        // check password and confirm password is not matched
        if (!(password === confirmPassword)) return res.status(400).send('password and confirm password is not matched.');

        // password validation using regex.
        if (!validator.password(password)) return res.status(400).send("please enter strong password.");

        // const bycyptpassword = await bcrypt.hash(password, 10);
        const bycyptpassword = await helper.bcryptPassword(password);

        const data = await register.findOneAndUpdate({ email: email },{password : bycyptpassword});

        res.status(201).send("password Change successfully");
    } catch (err) {
        res.status(404).send(err)
    }
}