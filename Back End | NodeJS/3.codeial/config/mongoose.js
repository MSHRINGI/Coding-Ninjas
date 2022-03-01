const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_devlopment');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to DataBase'));

db.once('open', function(){
    console.log("Successfully connected to Data Base");
});

module.exports = db;

