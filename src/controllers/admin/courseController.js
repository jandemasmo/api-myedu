const CourseSchema = require("../../models/courseSchema");
const expressValidator = require("express-validator");

const addCurso = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req).formatWith(({msg}) => {
            return msg
        });
        if(!errors.isEmpty()){
            return res.status(401).json({ message: errors.mapped() });
        }

        const { name, description, duration  } = req.body;
        const newCourse = await new CourseSchema({name, description, duration});
        newCourse.save()
        res.status(200).json({message:{success: "Curso adicionado com sucesso!"}, newCourse});  
    } catch (error) {
        res.status(500).json({message: {error: "Erro interno. Tente novamente"}})
    }
}

const getCurso = async (req, res) => {
    const errors = expressValidator.validationResult(req).formatWith(({msg}) => {
        return msg
    });
    if(!errors.isEmpty()){
        return res.status(401).json({ message: errors.mapped() });
    }

    try {
        course = await CourseSchema.findById({_id: req.params.id});
        res.status(200).json({course});  
    } catch (error) {
        res.status(500).json({message: {error: "Erro interno. Tente novamente"}})
    }
}

const getAllCurso = async (req, res) => {
    const errors = expressValidator.validationResult(req).formatWith(({msg}) => {
        return msg
    });
    if(!errors.isEmpty()){
        return res.status(401).json({ message: errors.mapped() });
    }

    try {
        courses = await CourseSchema.find();
        res.status(200).json({courses});  
    } catch (error) {
        res.status(500).json({message: {error: "Erro interno. Tente novamente"}})
    }
}

const updateCurso = async (req, res) => {
    const errors = expressValidator.validationResult(req).formatWith(({msg}) => {
        return msg
    });
    if(!errors.isEmpty()){
        return res.status(401).json({ message: errors.mapped() });
    }

    try {
        course = await CourseSchema.findById({_id: req.params.id});
        console.log(course)
        if(course){
            course.name = req.body.name || course.name
            course.description = req.body.description || course.description
            course.duration = req.body.duration || course.duration
        }
        await course.save();

        res.status(200).json({course});  
    } catch (error) {
        res.status(500).json({message: {error: "Erro interno. Tente novamente"}})
    }
}

const deleteCurso = async (req, res) => {
    
}

module.exports = {
    addCurso,
    getCurso,
    getAllCurso,
    updateCurso,
    deleteCurso
}