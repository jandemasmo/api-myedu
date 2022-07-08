const express = require("express");
const router = express.Router();

const validateLogin = require("../middlewares/admin/validateLogin");
const eadController = require("../controllers/ead/eadController")
const authStudent = require("../middlewares/ead/authStudent");


//ead routes
router.post("/login", validateLogin.auth, eadController.login);
router.get("/dashboard", authStudent.auth, eadController.dashboard);
router.get("/themes/:id", authStudent.auth, eadController.themes);



module.exports = router;