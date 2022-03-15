const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID : '285418167104-tdv5ab2ee089f311fkbnvj3p4e7r36lq.apps.googleusercontent.com',
        clientSecret : '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',
        callbackURL : 'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done){
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("Error in finding user google passport-strategy", err);
                return;
            }
            console.log(profile);

            if(user){
                return done(null, user);
            }else{
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log("Error in creating user google passport-strategy", err);
                        return;
                    }
                    return done(null, user);
                });
                
            }
        })
    }
));

module.exports = passport;