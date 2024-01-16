import express from 'express';
import { registerUser, getRegisteredUsers, createAmbassador } from '../controllers/user.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/', getRegisteredUsers);
router.post('/ambassador/create', createAmbassador);

export default router;
