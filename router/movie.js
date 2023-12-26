const express = require('express');
const router = express.Router();
const {getallmovie,postmovie ,setstatus,setbanner,searchmovie,filter,rating,specific,onem} = require('../controller/movie')

router.route('/getall').get(getallmovie);
router.route('/post').post(postmovie);
router.route('/setstatus').post(setstatus);
router.route('/setbanner').patch(setbanner);
router.route('/search').post(searchmovie);
router.route('/filter/:data').get(filter);
router.route('/rating').patch(rating);
router.route('/specific').get(specific);
router.route('/getone/:id').get(onem);

module.exports = router;