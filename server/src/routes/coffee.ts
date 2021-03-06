import express from 'express';
import controller from '../controllers/coffee';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a coffee to the database
router.post('/', extractJWT, controller.addCoffee);

//$ Gets all coffees that belong to a user
router.get('/', extractJWT, controller.getAllCoffees);

//$ Gets a coffee that belongs to the user
router.get('/:id', extractJWT, controller.getCoffee);

//$ Deletes a coffee that belongs to the user
router.delete('/:id', extractJWT, controller.deleteCoffee);

//$ Updates a coffee that belongs to the user
router.patch('/:id', extractJWT, controller.updateCoffee);

export = router;
