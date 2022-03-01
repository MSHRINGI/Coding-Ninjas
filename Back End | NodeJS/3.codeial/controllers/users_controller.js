
const User = require('../models/user');

module.exports.profile = function(req, res){
    // return res.end('<h1> At users profile </h1>');
    res.render('user', {
        title : 'profile'
    });
}

// get the sign_in
module.exports.signIn = function(req, res){
    // if user signed in then redirect him to profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('sign_in', {
        title : "Codeial | Sign In"
    });
}

// for sign_up
module.exports.signUp = function(req, res){
    // if user signed in then redirect him to profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('sign_up', {
        title : "Codeial | Sign Up"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        // alert("Password has not matched");
        // location.reload();
        console.log("Password has not matched while sign up");
        return res.redirect('back');
    }
    User.findOne({email : req.body.email}, function(err, user){
        if(err){
            console.log("Error in creating the user");
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log("Error in creating the user while sign up");
                    return;
                }
                return res.redirect('/users/profile');
            })
        }else{
            return res.redirect('back');
        }
    })
}

// sign in data
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

// for sign-out
module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}