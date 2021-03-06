const express = require('express');
const passport = require('passport');
const router = express.Router();
const paasport = require('passport')

const postsController = require('../controllers/posts_controller');
router.post('/create', passport.checkAuthentication,postsController.create);
router.get('/destroy/:id', paasport.checkAuthentication, postsController.destroy);

// console.log(("router form posts.js", router));

module.exports = router;