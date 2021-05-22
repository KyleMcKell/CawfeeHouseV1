import express from 'express';
import controller from '../controllers/coffee';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a coffee to the database
router.post('/add', extractJWT, controller.addCoffee);

//$ Gets all coffees that belong to a user
router.get('/get', extractJWT, controller.getAllCoffees);

//$ Gets a coffee that belongs to the user
router.get('/get/:id', extractJWT, controller.getCoffee);

//$ Deletes a coffee that belongs to the user
router.delete('/delete/:id', extractJWT, controller.deleteCoffee);

//$ Updates a coffee that belongs to the user
router.patch('/update/:id', extractJWT, controller.updateCoffee);

export = router;
