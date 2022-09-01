const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const questionsRouter = require('./questions');

router.use('/user', userRouter);
router.use('/questions', questionsRouter)

module.exports = router;
