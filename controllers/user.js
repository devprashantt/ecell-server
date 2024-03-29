import User from '../models/user.js';

import { sendConfirmationEmail } from '../services/email.service.js';

// User registration controller
export const registerUser = async (req, res) => {
    try {
        const { name, email, college, event_id } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            college,
        });

        // Add event to user object
        const event = await Event.findOne({ _id: event_id });
        if (!event) {
            return res.status(400).json({ error: 'Event not found.' });
        }

        newUser.events.push(event);
        await newUser.save();

        // Add user to event model
        event.attendees.push(newUser);
        await event.save();

        // Emit the 'userRegistered' event
        eventEmitter.emit('userRegistered', newUser);

        // Send confirmation email
        await sendConfirmationEmail(newUser.email);

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('User registration error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

//Create a new ambassador
export const createAmbassador = async (req, res) => {
    try {
        const { name, email, phone, college, message } = req.body;

        // Check if the user already exists

        User.findOne({ email }, (err, user) => {
            if (err) {
                console.error('Error finding user:', err);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            if (user) {
                return res.status(400).json({ error: 'User already exists.' });
            }

            // Create a new user
            const newAmbassador = new User({
                name,
                email,
                phone,
                college,
                coverLetter: message,
                forAmbassador: true,
            });

            newAmbassador.save((err, user) => {
                if (err) {
                    console.error('Error saving user:', err);
                    return res.status(500).json({ error: 'Internal server error.' });
                }

                // Emit the 'ambassadorRegistered' event
                // eventEmitter.emit('ambassadorRegistered', user);

                // Send confirmation email
                // sendConfirmationEmail(user.email);

                res.status(201).json({ message: 'Ambassador registered successfully.' });
            });
        });
    } catch (error) {
        console.error('Ambassador registration error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

export const getRegisteredUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({ users });
    } catch (error) {
        console.error('Error retrieving registered users:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
