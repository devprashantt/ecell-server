import express from 'express';
import { registerUser, getRegisteredUsers } from '../controllers/user.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/', getRegisteredUsers);

export default router;
