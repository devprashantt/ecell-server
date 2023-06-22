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
    image: {
        type: String,
        required: true,
    },
    teams: {
        name: {
            type: String,
        },
        college: {
            type: String,
        }
    },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default model('Event', eventSchema);


