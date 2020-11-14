const express = require('express');
const pgdb = require("../db");
const bp = require('body-parser');

const server = express();

// Middleware

server.use(bp.json());




server.listen(3000)

