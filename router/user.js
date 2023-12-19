const express = require('express');
const router = express.Router();
const {createuser, changename, changemobile, changecity, changemail,deleteacc} = require('../controller/user')

router.route('/signup').post(createuser);
router.route('/updatename').patch(changename);
router.route('/updatemobile').patch(changemobile);
router.route('/updatecity').patch(changecity);
router.route('/updatemail').patch(changemail);
router.route('/delete').delete(deleteacc);

module.exports = router;