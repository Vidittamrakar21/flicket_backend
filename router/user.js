const express = require('express');
const router = express.Router();
const {createuser, changename, changemobile, changecity, oneuser,changemail,deleteacc,logout} = require('../controller/user')

router.route('/signup').post(createuser);
router.route('/updatename').patch(changename);
router.route('/updatemobile').patch(changemobile);
router.route('/updatecity').patch(changecity);
router.route('/updatemail').patch(changemail);
router.route('/delete').delete(deleteacc);
router.route('/logout').post(logout);
router.route('/one/:id').get(oneuser);

module.exports = router;