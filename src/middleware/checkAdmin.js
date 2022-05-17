const register = require('./../model/user');

module.exports.checkRole = async (req, res, next) => {
    try {
        const userDetail = req.userDetail;
        // console.log(userDetail);
        const data = await register.findOne({ _id: userDetail._id })
        // console.log(data);
        const user = data.isAdmin;
        // console.log(user);
        if(user === false ){
           return res.status(404).send(" you cannot access this route you are not a admin");
        }
        next()
    } catch (err) {
        res.status(404).send(err);
    }
}
