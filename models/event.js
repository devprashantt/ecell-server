import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    registrationLink: {
        type: String,
        required: true,
    },
    passcode: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Assuming you will store the image URL as a string
        required: true,
    },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default model('Event', eventSchema);


