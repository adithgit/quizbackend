const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questions");
const authenticateUser = require("../middlewares/authenticateUser");

// Authentication Middleware
router.use(authenticateUser);
// Checks if already logged in else authorize 


// Public Routes
router.post('/result', questionsController.addResult);
router.get('/category', questionsController.getCategories);
router.get('/subcategory/:catId', questionsController.getSubCategories);
router.get('/quiz/:subId', questionsController.getQuestions);


module.exports = router;
