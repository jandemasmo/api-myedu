const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/adminController");
const validateRegister = require("../../middlewares/admin/validateRegister");
const validateLogin = require("../../middlewares/admin/validateLogin");
const authAdmin =require("../../middlewares/admin/authAdmin")

router.get("/",authAdmin.auth ,adminController.dashboard);


router.post("/register-admin", validateRegister.auth, adminController.registerAdmin);
router.post("/login-admin", validateLogin.auth, adminController.loginAdmin);

module.exports = router;