const User = require('../../../models/user');
const env = require('../../../config/environment');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    let user = await User.findOne({email : req.body.email});
    if(!user || user.password != req.body.password){
        return res.status(422).json({
            message : "Invalid Username or Password",
        });
    }
    return res.status(200).json({
        message : "Here is your token | keep it safe",
        token : jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn : 10000*20})
    });
}