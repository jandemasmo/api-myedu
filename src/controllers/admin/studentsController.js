const StudentSchema = require("../../models/studentSchema");
const expressValidator = require("express-validator");
const bcrypt = require("bcrypt");

const addStudent = async (req, res) =>{
    try {
        const errors = expressValidator.validationResult(req).formatWith(({msg}) =>{
            return msg
        });
        if(!errors.isEmpty()){
            return res.status(401).json({message: errors.mapped()})
        }

        emailVerify = await StudentSchema.findOne({email: req.body.email});

        if(!emailVerify){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const {name, email, password, course} = req.body;
            const newStudent = new StudentSchema({name, email, password, course});
            await newStudent.save();
            res.status(200).json({message: {sucess: "Usuário criado com sucesso!"}, newStudent});
        }else{
            res.status(401).json({message: {error: "Email já cadastrado"}});
        }

    } catch (error) {
        res.status(500).json({message: { error: "Erro interno tente mais tarde"}});
    }
}

const getAllStudents  = async (req, res) => {
    try {
        const students = await StudentSchema.find()
        if(students){
            res.status(200).json({message: students});
        }else{
            res.status(404).json({message: { error: "Nenhum estudante encontrado"}});
        }
    } catch (error) {
        res.status(500).json({message: { error: "Erro interno tente mais tarde"}});
    }
}

const getStudent = async (req, res) =>{
    try {
        const student = await StudentSchema.findOne({_id: req.params.id});
        if(student){
            res.status(200).json({message: student});
        }else{
            res.status(404).json({message: { error: "Estudante não encontrado"}});
        }
    } catch (error) {
        res.status(500).json({message: { error: "Erro interno tente mais tarde"}});
    }
}

const updateStudent = async (req, res) =>{
    try {
        const errors = expressValidator.validationResult(req).formatWith(({msg}) =>{
            return msg
        });
        if(!errors.isEmpty()){
            return res.status(401).json({message: errors.mapped()})
        }

        const studentToUpdate = await StudentSchema.findOne({_id: req.params.id});
        if(studentToUpdate){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
           studentToUpdate.name = req.body.name || studentToUpdate.name;
           studentToUpdate.email = req.body.email || studentToUpdate.email;
           studentToUpdate.password = req.body.password || studentToUpdate.password;
           studentToUpdate.save();
           res.status(200).json({message: {studentToUpdate}})
        }
    } catch (error) {
        res.status(500).json({message: { error: "Erro interno tente mais tarde"}});
    }
}

const deleteStudent = async (req, res) =>{
    //implementar lógica de delete ou desabilitar estudante
}

module.exports = {
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
}