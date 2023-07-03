import express from 'express';
import { createEvent, getEvents, getEventById, deleteEvent, updateEvent } from '../controllers/event.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/create', createEvent);
router.get('/:id', getEventById);
router.delete('/delete/:id', deleteEvent);
router.put('/update/:id', updateEvent);

export default router;
