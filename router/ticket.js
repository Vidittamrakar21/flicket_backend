const express = require('express');
const router = express.Router();
const {maketicket,getticket,getoneticket} = require('../controller/ticket');

router.route('/maketicket').post(maketicket);
router.route('/getticket').post(getticket);
router.route('/getoneticket').post(getoneticket);

module.exports = router;