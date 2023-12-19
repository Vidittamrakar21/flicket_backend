const express = require('express');
const router = express.Router();
const {setallseats} = require('../controller/status')

router.route('/setallseats').patch(setallseats);


module.exports = router;