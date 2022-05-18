const express = require("express");
const router = express.Router();
const websiteController = require("../controllers/websiteController");


router.get("/", websiteController.home )

module.exports = router