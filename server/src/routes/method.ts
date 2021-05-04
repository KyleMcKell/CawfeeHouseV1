import express from 'express';
import controller from '../controllers/method';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a method to the database
router.post('/add', extractJWT, controller.addMethod);

//$ Gets all methods that belong to a user
router.get('/', extractJWT, controller.getAllMethods);

//$ Gets a method that belongs to the user
router.get('/:id', extractJWT, controller.getMethod);

export = router;
