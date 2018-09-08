/* #region 0. Imports */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
/* #endregion */

const databaseConfig = require('./config/database.config');

const app = express();

/* #region 1. App */
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());


/* #region 2. Database */
mongoose.Promise = global.Promise;

// connect to database
mongoose.connect(databaseConfig.url, { useNewUrlParser: true })
    .then(() => {
        console.log("Database connection successful.");
        console.log(`Connected to: ${databaseConfig.url}`);
    })
    .catch(err => {
        console.log("Database connection failed.");
        console.log("Error:\n", err);
        process.exit();
    });
/* #endregion */


app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Easy Notes API." });
});


require('./app/routes/note.routes')(app);
app.listen(databaseConfig.port, () => {
    console.log(`Server started on port ${databaseConfig.port}.`);
});
/* #endregion */