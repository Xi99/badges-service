const express = require('express');
const pgdb = require("./db/db");
const bp = require('body-parser');
// const amqp = require('amqplib/callback_api');

const server = express();
const port = 8080;

// Middleware
server.use(bp.json());

// GET Routes

server.get('/badges', (__, res) => {
    pgdb.getAllBadges().then((results) => res.send(results))
});

// POST Routes

server.post("/badge", (req, res) => {
  pgdb.addBadge(req.body).then(res.sendStatus(201));
});


server.listen(port, () => console.log(`Server is running on port ${port}`));


