import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone: String,
    email: String,
    message: String,
    city: String,
    state: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;