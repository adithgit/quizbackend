const express = require('express');
const router = express.Router();
const bannerControl = require('../controllers/banner');

router.get('/get/:bannerName', bannerControl.getBanner);
router.post('/create', bannerControl.createBanner);
router.get('/delete/:bannerName', bannerControl.deleteBanner);

module.exports = router;