require('dotenv').config()
const mongoose = require('mongoose');

const dbConfig = process.env.MONGODB_URI;

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection