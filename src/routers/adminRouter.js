const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin/adminController");
const courseController = require("../controllers/admin/courseController");

const validateRegister = require("../middlewares/admin/validateRegister");
const validateLogin = require("../middlewares/admin/validateLogin");
const authAdmin =require("../middlewares/admin/authAdmin")

router.get("/",authAdmin.auth ,adminController.dashboard);

//users admin routes
router.post("/register", validateRegister.auth, adminController.register);
router.post("/login", validateLogin.auth, adminController.login);

//courses routers
router.post("/curso", authAdmin.auth ,courseController.addCurso );
router.get("/curso/:id", authAdmin.auth ,courseController.getCurso );
router.get("/curso", authAdmin.auth ,courseController.getAllCurso );
router.put("/curso/:id", authAdmin.auth ,courseController.updateCurso );
router.delete("/curso/:id", authAdmin.auth ,courseController.deleteCurso );

module.exports = router;