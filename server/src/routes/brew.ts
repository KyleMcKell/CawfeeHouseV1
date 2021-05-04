import express from 'express';
import controller from '../controllers/brew';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a brew to the database
router.post('/add', extractJWT, controller.addBrew);

//$ Gets all brews that belong to a user
router.get('/', extractJWT, controller.getUserBrews);

export = router;
