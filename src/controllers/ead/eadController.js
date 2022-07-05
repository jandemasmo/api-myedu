const StudentSchema = require("../../models/studentSchema");
const expressValidator = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dashboard = (req, res)=>{
    res.status(200).json({message: {success: "Aqui é o ead"}});
}

const login = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req).formatWith(({msg}) =>{
            return msg
        });
        if(!errors.isEmpty()){
            return res.status(401).json({message: errors.mapped()})
        }

        const studentVerify = await StudentSchema.findOne({email: req.body.email});
        if(!studentVerify){
            return res.status(401).json({ message: {error: "Você ainda não é nosso aluno!"}});
        }

        const validatePassword = bcrypt.compareSync(req.body.password, studentVerify.password);
        if(!validatePassword){
            return res.status(403).json({ message: {error: "E-mail ou password não inválido!"}}); 
        }

        const token = jwt.sign({email: req.body.email }, process.env.JWT_SECRET_TOKEN);
        res.status(200).json({token, user: studentVerify})

    } catch (error) {
        res.status(500).json({message: { error: "Erro interno tente mais tarde"}});
    }
}

module.exports = {
    dashboard,
    login,
}