const express = require('express');
const router = express.Router();
const {getallmovie,postmovie ,setstatus} = require('../controller/movie')

router.route('/getall').get(getallmovie);
router.route('/post').post(postmovie);
router.route('/setstatus').post(setstatus);

module.exports = router;