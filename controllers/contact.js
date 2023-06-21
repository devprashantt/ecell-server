import Contact from '../models/contact.js';

export async function createContact(req, res) {
    const { first_name, last_name, phone, email, message, city, college } = req.body;

    const newContact = new Contact({ first_name, last_name, phone, email, message, city, college });

    try {
        await newContact.save();

        res.status(201).json(newContact);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}