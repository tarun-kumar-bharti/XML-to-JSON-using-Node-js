const router 				= require('express').Router();
const { loggedIn } 			= require("../helpers/auth.middleware");
const userController 		= require('../controllers/user.controller');
const inventoryController 	= require('../controllers/inventory.controller');

// Login
router.post('/login', userController.login);

//Inventory
router.post('/saverecon', loggedIn, inventoryController.saveRecon);
router.get('/getStatus', loggedIn, inventoryController.getStatus);
  
module.exports = router;