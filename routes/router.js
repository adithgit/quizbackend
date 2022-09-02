const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const questionsRouter = require('./questions');
const bannerRouter = require('./banner');

router.use('/banner', bannerRouter);
router.use('/user', userRouter);
router.use('/questions', questionsRouter)


module.exports = router;
