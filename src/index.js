const express = require('express');
const pgdb = require("./db/db");
const bp = require('body-parser');
// const amqp = require('amqplib/callback_api');

const server = express();
const port = 3000;

// Middleware
server.use(bp.json());

// GET Routes

server.get('/', (__, res) => {
    pgdb.getAllBadges().then((results) => res.send(results))
});


server.listen(port, () => console.log(`Server is running on port ${port}`));


