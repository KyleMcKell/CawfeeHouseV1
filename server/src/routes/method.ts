import express from 'express';
import controller from '../controllers/method';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a method to the database
router.post('/', extractJWT, controller.addMethod);

//$ Gets all methods that belong to a user
router.get('/', extractJWT, controller.getAllMethods);

//$ Gets a methods that belongs to the user
router.get('/:id', extractJWT, controller.getMethod);

//$ Deletes a method that belongs to the user
router.delete('/:id', extractJWT, controller.deleteMethod);

//$ Updates a method that belongs to the user
router.patch('/:id', extractJWT, controller.updateMethod);

export = router;
