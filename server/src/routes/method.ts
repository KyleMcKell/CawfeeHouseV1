import express from 'express';
import controller from '../controllers/method';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a method to the database
router.post('/add', extractJWT, controller.addMethod);

//$ Gets all methods that belong to a user
router.get('/get', extractJWT, controller.getAllMethods);

//$ Gets a methods that belongs to the user
router.get('/get/:id', extractJWT, controller.getMethod);

//$ Deletes a method that belongs to the user
router.delete('/delete/:id', extractJWT, controller.deleteMethod);

//$ Updates a method that belongs to the user
router.patch('/update/:id', extractJWT, controller.updateMethod);

export = router;
