
const User = require('../models/user');

module.exports.profile = function(req, res){
    // return res.end('<h1> At users profile </h1>');
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log("Error in finding the user you are searching");
            return res.redirect('/');
        }
        res.render('user', {
            title : user.name,
            profile_user : user
        });
    })
    
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            if(err){
                console.log("Error in updating the user details");
                return res.redirect('/');
            }
            return res.redirect('/users/profile/<%= req.user.id %>');
        })
    }else{
        return res.status(401);
    }
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