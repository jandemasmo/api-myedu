const express = require("express");
const router = express.Router();

const validateLogin = require("../middlewares/admin/validateLogin");

const eadController = require("../controllers/ead/eadController")

const authStudent = require("../middlewares/admin/authStudent");


//ead routes
router.get("/", authStudent.auth, eadController.dashboard)

router.post("/login", validateLogin.auth, eadController.login);

module.exports = router;