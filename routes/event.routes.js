import express from 'express';
import { createEvent, getEvents, getEventById } from '../controllers/event.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/create', createEvent);
router.get('/:id', getEventById);

export default router;
