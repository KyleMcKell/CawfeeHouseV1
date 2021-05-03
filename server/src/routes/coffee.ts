import express from 'express';
import controller from '../controllers/coffee';

const router = express.Router();

//$ Adds a coffee to the database
router.post('/add', controller.addCoffee);

export = router;
