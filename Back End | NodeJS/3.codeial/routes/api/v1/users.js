const express = require('express');
const router = express.Router();

const usersApiController = require('../../../controllers/api/v1/users_api_controller');
router.post('/create-session', usersApiController.createSession);

module.exports = router;