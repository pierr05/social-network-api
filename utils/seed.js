const connection = require('../config/connection'); 
const {User, Thought} = require('../models');
const {userData, thoughtData}= require('./data');

connection.on('error', (err) => err);

connection.once('open', async() => {
    console.log('connected');

    await User.deleteMany({});
    await User.insertMany(userData);

    await Thought.deleteMany({});
    await Thought.insertMany(thoughtData);

});