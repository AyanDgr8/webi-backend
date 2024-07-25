// src/models/participants.js


import mongoose from 'mongoose';

const participantsSchema = new mongoose.Schema(
    {
        fullName: { 
            type: String, 
        },
        email: { 
            type: String, 
        },
        phone: { 
            type: Number, 
        },
        date_time: {
            type: Date,
        },
        passwordUpdatedAt: {
            type: Date,
            default: null,
        },
        lastLoginAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true
    }
);

// Middleware to set timestamps in IST
participantsSchema.pre('save', function(next) {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    this.updatedAt = now;
    this.createdAt = now;
});


// Middleware to update timestamps in IST on updates
participantsSchema.pre('findOneAndUpdate', function(next) {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    this._update.updatedAt = now;
    this._update.createdAt = now;
    next();
});



const Participants = mongoose.model('Participants', participantsSchema);

export { Participants };