const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');
const { route } = require('.');
const passport = require('passport');
router.get('/profile/:id', passport.checkAuthentication,usersController.profile);
router.post('/update/:id', passport.checkAuthentication,usersController.update);
// router.get('/posts', postsController.post);

router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.post('/create', usersController.create);

// the below method is for manual authentication
// router.post('/create-session', usersController.createSession);

// this one is for passport js
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'},
), usersController.createSession);

// for logout
router.get('/sign-out', usersController.destroySession);

// console.log(("router form users.js", router));
module.exports = router;