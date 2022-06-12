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

module.exports = {
    addStudent
}