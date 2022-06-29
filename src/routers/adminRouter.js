const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin/adminController");
const courseController = require("../controllers/admin/courseController");
const educatorController = require("../controllers/admin/educatorController");
const studentsController = require("../controllers/admin/studentsController");
const materialsController = require("../controllers/admin/materialsController");
const themeController = require("../controllers/admin/themeController");

const validateRegister = require("../middlewares/admin/validateRegister");
const validateLogin = require("../middlewares/admin/validateLogin");
const courseValidator = require("../middlewares/admin/courseValidator");
const educatorValidator = require("../middlewares/admin/educatorValidator");
const studentValidator = require("../middlewares/admin/studentValidate");
const materialValidator = require("../middlewares/admin/materialValidator");

const authAdmin = require("../middlewares/admin/authAdmin");

router.get("/",authAdmin.auth ,adminController.dashboard);

//users admin routes
router.post("/register", validateRegister.auth, adminController.register);
router.post("/login", validateLogin.auth, adminController.login);

//courses routes
router.post("/course", authAdmin.auth, courseValidator.auth, courseController.addCurso );
router.get("/course/:id", authAdmin.auth,courseController.getCurso );
router.get("/course", authAdmin.auth, courseController.getAllCurso );
router.put("/course/:id", authAdmin.auth, courseValidator.auth, courseController.updateCurso );
router.delete("/course/:id", authAdmin.auth, courseValidator.auth, courseController.deleteCurso );

//materials routes
router.post("/materials",authAdmin.auth,materialValidator.auth ,materialsController.addMaterials);
router.get("/materials/:id",authAdmin.auth, materialsController.getAllMaterials);
router.get("/materials",authAdmin.auth, materialsController.getMaterials);
router.put("/materials/:id",authAdmin.auth, materialsController.updateMaterials);
router.delete("/materials/:id",authAdmin.auth, materialsController.deleteMaterials);

//theme routes
router.post("/theme",authAdmin.auth, themeController.addTheme);
router.get("/theme/:id",authAdmin.auth, themeController.getAllTheme);
router.get("/theme",authAdmin.auth, themeController.getTheme);
router.put("/theme/:id",authAdmin.auth, themeController.updateTheme);
router.delete("/theme/:id",authAdmin.auth, themeController.deleteTheme);

//educator routes 
router.post("/educator",authAdmin.auth, educatorValidator.auth, educatorController.addEducator );
router.get("/educator/:id",authAdmin.auth, educatorController.getEducator );
router.get("/educator",authAdmin.auth, educatorController.getAllEducator );
router.put("/educator/:id",authAdmin.auth, educatorValidator.auth, educatorController.updateEducator );
router.delete("/educator/:id",authAdmin.auth, educatorController.deleteEducator );

//student routes
router.post("/student", authAdmin.auth, studentValidator.auth ,studentsController.addStudent);
router.get("/student/:id", authAdmin.auth, studentsController.getStudent);
router.get("/student", authAdmin.auth, studentsController.getAllStudents);
router.put("/student/:id", authAdmin.auth, studentValidator.auth , studentsController.updateStudent);
router.delete("/student/:id", authAdmin.auth, studentsController.deleteStudent);

module.exports = router;