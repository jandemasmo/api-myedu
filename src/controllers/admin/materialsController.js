const MaterialsSchema = require("../../models/materialsSchema");
const expressValidator = require("express-validator");

const addMaterials = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req).formatWith(({msg}) => {
            return msg
        })
        if(!errors.isEmpty()){
            return res.status(401).json({ message: errors.mapped() });
        }

        if(!req.body.id_course){
            res.status(400).json({message: {error: "Escolha um curso"}});
        }

        const newMaterial = new MaterialsSchema({id_course: req.body.id_course, name: req.body.name});
        await newMaterial.save();
        res.status(200).json({newMaterial});
    } catch (error) {
        res.status(500).json({message: {error: "Erro interno tente mais tarde"}});
    }
}

const getAllMaterials = (req, res) => {

}

const getMaterials = (req, res) => {

}

const updateMaterials = (req, res) => {

}

const deleteMaterials = (req, res) => {

}


module.exports = {
    addMaterials,
    getAllMaterials,
    getMaterials,
    updateMaterials,
    deleteMaterials
}