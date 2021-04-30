import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Protected route to validate a user when performing an action
router.get('/validate', extractJWT, controller.validateToken);

//$ Registers a user, request body contains JSON {username, email, password}
router.post('/register', controller.register);

//$ Logs in a user, request body contains JSON {userLoginID, password}
//? userLoginID is a string containing either the user's username or email
router.post('/login', controller.login);

//$ Protected route to get all users
router.get('/get/all', extractJWT, controller.getAllUsers);

export = router;
