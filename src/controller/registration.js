const register = require('../model/user');
const validator = require('../helper/validator');
const helper = require('../helper/helper');
const login = require('../model/login');

module.exports.userRegistration = async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, password, confirmPassword } = req.body;

        //check email is already register or not
        const checkEmail = await register.findOne({ email });
        if (checkEmail != null) return res.status(400).send('user already registered plz login.');

        // email validation using regex .
        if (!validator.email(email)) return res.status(400).send("please enter a email address.");

        // check password and confirm password is not matched
        if (!(password === confirmPassword)) return res.status(400).send('password and confirm password is not matched.');

        // password validation using regex.
        if (!validator.password(password)) return res.status(400).send("please enter strong password.");
        
        //bcrypt password 
        // const bycyptpassword = await bcrypt.hash(password, 10);
        const bycyptpassword = await helper.bcryptPassword(password);

        // data save in db
        const registerDataPayload = { ...req.body, password: bycyptpassword };
        // console.log({registerDataPayload , body: req.body});
        const registerdata = new register(registerDataPayload);
        const loginUser = new login({userId : registerdata._id});
        // console.log("the success part",registerdata._id);
        await loginUser.save();
        await registerdata.save();
        res.status(202).send("user register successfully.");
    } catch (err) {
        console.log(err);
    }
}
