const express = require("express");
const router = express.Router();
const websiteController = require("../controllers/websiteController");


router.get("/", websiteController.home )
router.post("/contact", websiteController.contact )
router.get("/teste", websiteController.teste )

module.exports = router