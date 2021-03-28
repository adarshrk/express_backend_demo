const mongoose = require('mongoose');
const { mongodbHost, port, dbName } = require('../config/db.json');

const dbPath = `mongodb://${mongodbHost}:${port}/${dbName}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const getMongoConnection = (req, res, next) => {
    mongoose.connect(dbPath, options)
    .then((db) => {
        next();
    })
    .catch((err) => {
        next(err);
    })
};

module.exports = { getMongoConnection };
