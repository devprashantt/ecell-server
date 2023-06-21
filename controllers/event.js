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
        console.log('Event creation request received:', req.body);
        console.log('Event image:', req.body.croppedImage);

        const { title, description, date, registrationLink, passcode, email } = req.body;

        // const image_link = await uploadImage(req.body.croppedImage);

        console.log('Event creation request received:', req.body);

        // Check if the passcode is valid
        if (passcode !== process.env.EVENT_CREATION_PASSCODE) {
            return res.status(401).json({
                success: false,
                message: 'Invalid passcode',
            });
        }

        // Check if the requesting user's email is allowed
        const allowedEmails = ['officialprashanttt@gmail.com'];

        if (!allowedEmails.includes(email)) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized user',
            });
        }

        // Create a new event using the Event model
        const event = new Event({
            title,
            description,
            date,
            registrationLink,
            passcode,
            email,
            image: req.body.croppedImage,
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
