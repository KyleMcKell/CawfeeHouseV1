import express from 'express';
import controller from '../controllers/method';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a method to the database
router.post('/add', extractJWT, controller.addMethod);

//$ Gets all methods that belong to a user
router.get('/', extractJWT, controller.getAllMethods);

//$ Deletes a method that belongs to the user
router.delete('/:id', extractJWT, controller.deleteMethod);

//$ Updates a method that belongs to the user
router.patch('/:id', extractJWT, controller.updateMethod);

export = router;
