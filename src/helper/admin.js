const register = require('./../model/user');
const login = require('./../model/login') 
const bcrypt = require('bcrypt');

exports.AutoCall = async () => {
    try {
        // dynamic create super admin 
        (async () => {
            const userdata = new register({
                firstName: "Shivam",
                lastName: "thakur",
                email: "shivam@yopmail.com",
                mobile: "8171287903",
                password: await bcrypt.hash("Shivam@123", 10),
                isAdmin: true
            })
            const admin = await register.findOne({ email: "shivam@yopmail.com" });
            // console.log(admin)
            if (!admin) {
                 await userdata.save();
            }
            const main = await register.findOne({ email: "shivam@yopmail.com" });
            const loginData = await login.findOneAndUpdate({email : main.email},{userId : main._id});
            // console.log(!loginData);
            if(!loginData) {
                const data = new login({
                    userId : main._id,
                    email : main.email
                });
                return await data.save();
            }
        })();
    } catch (err) {
        console.log(err)
    }

}