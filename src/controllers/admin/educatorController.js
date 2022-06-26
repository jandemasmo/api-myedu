const EducatorSchema = require("../../models/educatorSchema");
const expressValidator = require("express-validator");
const bcrypt = require("bcrypt");

const addEducator = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req).formatWith(({ msg }) => {
            return msg;
        });
        if (!errors.isEmpty()) {
            return res.status(401).json({ message: errors.mapped() });
        }
    
        const emailVerify = await EducatorSchema.findOne({ email: req.body.email });
        if (!emailVerify) {
            
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const { name, email, password, educatorInTheCourse } = req.body;
            const newEducator = new EducatorSchema({ name, email, password, educatorInTheCourse });
            await newEducator.save();
            res.status(200).json({ message: { success: "Educator criado com sucesso" }, newEducator });
        } else {
            return res.status(403).json({ message: { error: "Já existe um educator com esse email" } });
        }


    } catch (error) {
        res.status(500).json({message: {error: "Erro interno. Tente novamente"}})
    }
}

const getEducator = async (req, res) =>{
    try {
        const educator =  await EducatorSchema.findOne({_id: req.params.id});
        if(educator){
            res.status(200).json({message: educator});
        }else{
            res.status(404).json({message: { error: "Educador não encontrado"}});
        }
    } catch (error) {
        res.status(500).json({message: {error: "Erro interno. Tente novamente"}})
    }
}
const getAllEducator = async (req, res) =>{
    try {
        const educator =  await EducatorSchema.find();
        if(educator){
            res.status(200).json({message: educator});
        }else{
            res.status(404).json({message: { error: "Nenhum educador não encontrado"}});
        }
    } catch (error) {
        res.status(500).json({message: {error: "Erro interno. Tente novamente"}})
    }
}
const updateEducator = async (req, res) =>{

}
const deleteEducator = async (req, res) =>{

}

module.exports = {
    addEducator,
    getEducator,
    getAllEducator,
    updateEducator,
    deleteEducator
}