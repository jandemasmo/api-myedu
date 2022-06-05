const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./config/database");
require("dotenv-safe").config();


database.connect();
app.use(express.json());
app.use(cors())

//website routers
const websiteRouter = require("./routers/websiteRouter");
app.use("/", websiteRouter);

//EAD routers


//Admin routers
const adminRouter = require("./routers/adminRouter");
app.use("/admin", adminRouter);



module.exports = app;