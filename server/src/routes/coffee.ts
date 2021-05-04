import express from 'express';
import controller from '../controllers/coffee';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a coffee to the database
router.post('/add', extractJWT, controller.addCoffee);

//$ Gets all coffees that belong to a user
router.get('/', extractJWT, controller.getAllCoffees);

export = router;
