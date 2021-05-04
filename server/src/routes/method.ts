import express from 'express';
import controller from '../controllers/method';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

//$ Adds a coffee to the database
router.post('/add', extractJWT, controller.addMethod);

export = router;
