require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { createTunnel } = require('./helpers/tunnel');

const { PORT: port } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);
app.listen(port, () => {
  createTunnel(port);
});

module.exports = app;
