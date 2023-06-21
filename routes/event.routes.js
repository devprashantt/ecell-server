import express from 'express';
import { createEvent, getEvents } from '../controllers/event.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/create', createEvent);

export default router;
