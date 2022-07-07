const express = require("express");
const router = express.Router();

const validateLogin = require("../middlewares/admin/validateLogin");
const eadController = require("../controllers/ead/eadController")
const authStudent = require("../middlewares/ead/authStudent");


//ead routes
router.get("/dashboard", authStudent.auth, eadController.dashboard)
router.post("/login", validateLogin.auth, eadController.login);

module.exports = router;