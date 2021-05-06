import express from 'express';
import controller from '../controllers/brew';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a brew to the database
router.post('/add', extractJWT, controller.addBrew);

//$ Gets all brews that belong to a user
router.get('/', extractJWT, controller.getAllBrews);

//$ Gets a brew that belongs to the user
router.get('/:id', extractJWT, controller.getBrew);

//$ Deletes a brew that belongs to the user
router.delete('/:id', extractJWT, controller.deleteBrew);

export = router;
