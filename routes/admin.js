const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questions");
const adminController = require('../controllers/admin');
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const authenticateUser = require("../middlewares/authenticateUser");

// Public Routes

router.post('/register', adminController.register);
router.post('/login', adminController.login);

// Authentication Middleware
// Extract data from jwt token
router.use(authenticateUser);
// Check if its admin from data
router.use(authenticateAdmin);

router.get("/check", (req,res)=>{
    console.log(req.user);
    res.status(200).send({admin:true});
})

// Private Routes
router.post('/add/question',questionsController.addQuestion);
router.post('/add/category',questionsController.addCategory);
router.post('/add/subcategory',questionsController.addSubCategories);
router.get('/remove/category/:catId',questionsController.removeCategory);
router.get('/remove/subcategory/:subId',questionsController.removeSubCategory);
router.get('/remove/question/:questionId',questionsController.removeQuestion);
router.post('/edit/category', questionsController.editCategory);
router.post('/edit/subcategory', questionsController.editSubcategory);
// Change the active parameter of subcategory
router.get('/trigger/:subId', questionsController.triggerSubCategory); 
// Get active subcateogories 
router.get('/subcategory/active/:catId', questionsController.getActiveSubCategories);

module.exports = router;
