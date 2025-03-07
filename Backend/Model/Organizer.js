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
    HostedEvents: [
        {
            eventName: {
                type: String
            },
            eventid:{
                type:String
            },
            description: {
                type: String
            },
            dateTime: {
                type: Date
            },
            location: {
                type: String
            },
            mode: { type: String },
            ticketType: { type: String },
            image: { type: String }
        }
    ]

})

const User = mongoose.model('Organizer', userSchema);
module.exports = User;