import express from 'express';
import controller from '../controllers/method';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a coffee to the database
router.post('/add', extractJWT, controller.addMethod);

//$ Gets all coffees that belong to a user
router.get('/', extractJWT, controller.getAllMethods);

export = router;
