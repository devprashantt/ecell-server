import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },
    coverLetter: { type: String },
    forAmbassador: { type: Boolean, default: false },
    isAmbassador: { type: Boolean, default: false },
    college: { type: String, required: true },
    score: { type: Number, default: 0 },
    events: [
        {
            event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
            registrationDate: { type: Date, default: Date.now },
            details: { type: mongoose.Schema.Types.Mixed },
        },
    ],
});

const User = mongoose.model("User", userSchema);

export default User;


