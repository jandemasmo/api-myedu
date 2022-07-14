const StudentSchema = require("../../models/studentSchema");
const CourseSchema = require("../../models/courseSchema");
const MaterialsSchema = require("../../models/materialsSchema");
const ThemeSchema = require("../../models/themeSchema");
const StatusThemeStudent = require("../../models/statusThemeStudent");
const EducatorSchema = require("../../models/educatorSchema");
const expressValidator = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const dashboard = async (req, res) => {
    try {
        const course = await CourseSchema.findOne({ _id: req.user.course });
        const materials = await MaterialsSchema.find({ id_course: course._id }).populate("id_educator");
        const courseName = course.name
        const student = req.user.name;
        res.status(200).json({ materials, courseName, student });
    } catch (error) {
        res.status(500).json({ message: { error: "Erro interno .Tente mais tarde" } });
    }
}

const login = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req).formatWith(({ msg }) => {
            return msg
        });
        if (!errors.isEmpty()) {
            return res.status(401).json({ message: errors.mapped() })
        }

        const studentVerify = await StudentSchema.findOne({ email: req.body.email });
        if (!studentVerify) {
            return res.status(401).json({ message: { error: "Você ainda não é nosso aluno!" } });
        }

        const validatePassword = bcrypt.compareSync(req.body.password, studentVerify.password);
        if (!validatePassword) {
            return res.status(403).json({ message: { error: "E-mail ou password não inválido!" } });
        }

        const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET_TOKEN);
        res.status(200).json({ token, user: studentVerify })

    } catch (error) {
        res.status(500).json({ message: { error: "Erro interno. Tente mais tarde" } });
    }
}

const themes = async (req, res) => {
    try {
        const idMaterials = req.params.id
        const objectId = mongoose.Types.ObjectId;

        const info = await ThemeSchema.aggregate([
            {$match:{ id_materials: objectId(idMaterials)}},
            {$lookup:{ from: StatusThemeStudent.collection.name, 
                localField: "_id", 
                foreignField: "id_theme", 
                as: "status"}}
        ])

        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({ message: { error: "Erro interno. Tente mais tarde" } });
    }
}

const educator = async (req, res) => {
    try {
        const idEducator = await EducatorSchema.findOne({ id: req.params._id })
        res.status(200).json({ idEducator });
    } catch (error) {
        res.status(500).json({ message: { error: "Erro interno. Tente mais tarde" } })
    }
}

const updateStatusTheme = async (req, res) => {
    try {
        
        const {status, id_theme} = req.body
        const id_user = req.user._id
        const findStatus = await StatusThemeStudent.findOne({id_user, id_theme});

        if(!findStatus){
            const updateStatusTheme = new StatusThemeStudent({id_user, id_theme, status})
            await updateStatusTheme.save();
            res.status(200).json({resultStatus: updateStatusTheme})
        }else if(findStatus){
            findStatus.status = status
            await findStatus.save()
            res.status(200).json({resultStatus: findStatus})
        }
        
    } catch (error) {
        res.status(500).json({ message: { error: "Erro interno. Tente mais tarde" } })
    }
}


module.exports = {
    dashboard,
    login,
    themes,
    educator,
    updateStatusTheme
}