const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./config/database");
require("dotenv-safe").config();


database.connect();
app.use(express.json());
app.use(cors())


module.exports = app;