import express from 'express';
import controller from '../controllers/brew';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a brew to the database
router.post('/', extractJWT, controller.addBrew);

//$ Gets all brews that belong to a user
router.get('/', extractJWT, controller.getAllBrews);

//$ Gets a brew that belongs to the user
router.get('/:id', extractJWT, controller.getBrew);

//$ Deletes a brew that belongs to the user
router.delete('/:id', extractJWT, controller.deleteBrew);

//$ Updates a brew that belongs to the user
router.patch('/:id', extractJWT, controller.updateBrew);

export = router;
