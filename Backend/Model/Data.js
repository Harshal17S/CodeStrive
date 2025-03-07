const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    useremail: {
        type: String
    },
    earnedPoints: {
        type: Number
    },
    userLevel: {
        type: String
    },
    participatedEvents: [
        {
            eventId: {
                type: String,
                required: true
            },
            eventName: {
                type: String
            },
            participatedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

const User = mongoose.model('Participant', userSchema);
module.exports = User;