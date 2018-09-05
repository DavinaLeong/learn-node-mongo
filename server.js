const express = require('express');
const bodyParser = require('body-parser');

const databaseConfig = require('./config/database.config');

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Easy Notes API." });
});

app.listen(databaseConfig.port, () => {
    console.log(`Server started on port ${databaseConfig.port}.`);
});