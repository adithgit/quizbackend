const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questions");
const userController = require("../controllers/user");
const authenticateUser = require("../middlewares/authenticateUser");
const authenticateAdmin = require("../middlewares/athenticateAdmin");

// Authentication Middleware
router.use(authenticateUser);
// Checks if already logged in else authorize 

// Private Routes
router.get('/auth', userController.getAuth);

// Public Routes
router.get('/category', questionsController.getCategories);
router.get('/subcategory/:catId', questionsController.getSubCategories);
router.get('/quiz/:subId', questionsController.getQuestions);

// Admin Authentication
router.use(authenticateAdmin);

// Private Routes
router.post('/add/question',questionsController.addQuestion);
router.post('/add/category',questionsController.addCategory);
router.post('/add/subcategory',questionsController.addSubCategories);
router.get('/remove/category/:catId',questionsController.removeCategory);
router.get('/remove/subcategory/:subId',questionsController.removeSubCategory);
router.get('/remove/question/:questionId',questionsController.removeQuestion);
// Change the active parameter of subcategory
router.get('/trigger/:subId', questionsController.triggerSubCategory); 
// Get active subcateogories 
router.get('/subcategory/active/:catId', questionsController.getActiveSubCategories);

module.exports = router;
