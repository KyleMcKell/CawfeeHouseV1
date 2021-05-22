import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Test route to see if JWT works
router.get('/validate', extractJWT, controller.validateUserToken);

//$ Registers a user, request body contains JSON {username, email, password}
router.post('/register', controller.registerUser);

//$ Logs in a user, request body contains JSON {userLoginID, password}
//? userLoginID is a string containing either the user's username or email
router.post('/login', controller.loginUser);

//$ Protected route to get all users
router.get('/', controller.getAllUsers);

export = router;
