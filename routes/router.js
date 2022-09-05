const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const questionsRouter = require('./questions');
const bannerRouter = require('./banner');
const adminRouter = require('./admin');

router.use('/banner', bannerRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter)
router.use('/', questionsRouter);

module.exports = router;