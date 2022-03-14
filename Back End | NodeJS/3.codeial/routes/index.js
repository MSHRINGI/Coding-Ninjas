const express = require('express');
const homeController = require('../controllers/home_controller');

const router = express.Router();
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
// router.use('/sign_in', require('./sign_in'));
// router.use('/sign_up', require('./sign_up'));
// router.use('/posts', require('./posts'));

router.use('/api', require('./api'));

// console.log("router from index/routes", router);

module.exports = router;