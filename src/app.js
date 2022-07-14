const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./config/database");
require("dotenv-safe").config();


database.connect();

app.use(cors())

app.use(express.json());

//website routers
const websiteRouter = require("./routers/websiteRouter");
app.use("/", websiteRouter);

//EAD routers
const eadRouter = require("./routers/eadRouter");
app.use("/ead", eadRouter)

//Admin routers
const adminRouter = require("./routers/adminRouter");
app.use("/admin", adminRouter);



module.exports = app;