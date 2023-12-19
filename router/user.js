const express = require('express');
const router = express.Router();
const {createuser} = require('../controller/user')

router.route('/signup').post(createuser);

module.exports = router;