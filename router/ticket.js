const express = require('express');
const router = express.Router();
const {maketicket,getticket} = require('../controller/ticket');

router.route('/maketicket').post(maketicket);
router.route('/getticket').get(getticket);

module.exports = router;