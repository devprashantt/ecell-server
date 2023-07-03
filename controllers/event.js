import Event from '../models/event.js';
import dotenv from 'dotenv';
import { uploadImage } from '../config/cloudinary.js';

dotenv.config();

// Get all events
export async function getEvents(req, res) {
    try {
        const events = await Event.find();

        res.status(200).json({ events });

    } catch (error) {
        console.error('Error retrieving events:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

// Create a new event
export async function createEvent(req, res) {
    try {
        const { title, description, date, registrationLink } = req.body;

        const image_link = await uploadImage(req.body.croppedImage);

        console.log('Event creation request received:', req.body);

        // Create a new event using the Event model
        const event = new Event({
            title,
            description,
            date,
            registrationLink,
            image: image_link,
        });

        // Save the event to the database
        await event.save();

        // Return a success response
        return res.status(201).json({
            success: true,
            message: 'Event created successfully',
            event,
        });
    } catch (error) {
        // Handle any errors that occurred during event creation
        console.error('Error creating event:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create event',
            error: error.message,
        });
    }
};

//Delete an event
export async function deleteEvent(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        await event.remove();
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Update event
export async function updateEvent(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        const { title, description, date, registrationLink } = req.body;

        if (title) event.title = title;
        if (description) event.description = description;
        if (date) event.date = date;
        if (registrationLink) event.registrationLink = registrationLink;

        await event.save();
        res.status(200).json({ message: 'Event updated successfully', success: true, event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Get event
export async function getEventById(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
