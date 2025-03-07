const express = require('express');
const app = express();
const CORS = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const PORT = 6000;
const User = require('./Model/Data');
const Organizer = require('./Model/Organizer');

require('dotenv').config();

app.use(CORS({
    origin: "*",
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/HackMatrix_25').then(() => {
    console.log('Connected to the database');
})

app.get('/', (req, res) => {
    res.send('<h1>I am Alive Baby!!!</h1>')
})

app.post("/RegisterOrganizer", async (req, res) => {
    const { userName, userEmail } = req.body;

    const neworganizer = new Organizer({
        username: userName,
        useremail: userEmail
    })

    await neworganizer.save();

    res.send('Organizer Added Sucessfully');
})

app.post('/saveUser', async (req, res) => {
    const { userName, earnedPoints, userLevel, useremail } = req.body;
    const user = new User({
        username: userName,
        earnedPoints: earnedPoints,
        userLevel: userLevel,
        useremail: useremail
    })
    await user.save();
    res.send('Data is Saved Successfully');
})


app.post('/getUser', async (req, res) => {
    const { username } = req.body;
    const reguser = await User.findOne(({ username }));
    res.json({ User: reguser });
})

app.post('/updateParticipationPoints', async (req, res) => {
    const { username } = req.body;

    const reguser = await User.findOne(({ username }));
    reguser.earnedPoints += 10;
    await reguser.save();
    res.send('Points Updated Successfully');
});


app.post('/updateWinnerPoints', async (req, res) => {
    const { username } = req.body;
    const reguser = await User.findOne(({ username }));
    reguser.earnedPoints += 50;
    await reguser.save();
    res.send('Winning Points Updated Successfully');
})

app.post('/updateUserLevel', async (req, res) => {
    const { username } = req.body;
    const reguser = await User.findOne(({ username }));
    if (reguser.earnedPoints < 100) {
        reguser.userLevel = 'Begineer';
    }
    if (reguser.earnedPoints >= 100) {
        reguser.userLevel = 'Intermediate';
    }
    if (reguser.earnedPoints >= 200) {
        reguser.userLevel = 'Advanced'

    }
    await reguser.save();
    res.send('User Level Updated Successfully');
})

app.post('/updateUserParicipation', async (req, res) => {
    const { username, eventId, eventName, participatedAt } = req.body;

    const reguser = await User.findOne(({ username }));

    reguser.participatedEvents.push({ eventId, eventName, participatedAt });

    await reguser.save();

    res.send('Paticipation is Successfully Added');
})

app.post('/checkParticipation', async (req, res) => {
    const { username, eventId } = req.body;
    console.log(username, eventId);
    await axios.get(`https://www.eventbriteapi.com/v3/events/${eventId}/orders/`, {
        headers: { Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}` }
    }).then((response) => {
        const Data = response.data['orders'];
        Data.map(async (entry) => {
            if (entry.first_name === username) {
                const reguser = await User.findOne(({ username }));
                reguser.earnedPoints += 10;
                await reguser.save();
                res.send('Points Updated Successfully');
            }
        })
    }).catch(() => { console.log("Error While Checking Participation") })
})

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})