const MaterialsSchema = require("../../models/materialsSchema");
const expressValidator = require("express-validator");

const addMaterials = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req).formatWith(({ msg }) => {
            return msg
        })
        if (!errors.isEmpty()) {
            return res.status(401).json({ message: errors.mapped() });
        }

        if (!req.body.id_course) {
            res.status(400).json({ message: { error: "Escolha um curso" } });
        }

        const newMaterial = new MaterialsSchema({ id_course: req.body.id_course, name: req.body.name });
        await newMaterial.save();
        res.status(200).json({ newMaterial });
    } catch (error) {
        res.status(500).json({ message: { error: "Erro interno tente mais tarde" } });
    }
}

const getAllMaterials = async (req, res) => {
    try {
        const allMaterials = await MaterialsSchema.find();
        if (allMaterials) {
            res.status(200).json({ message: allMaterials });
        } else {
            res.status(404).json({ message: { error: "Nenhuma matéria disponível." } });
        }

    } catch (error) {
        res.status(500).json({ message: { error: "Erro interno tente mais tarde" } });
    }
}

const getMaterials = async (req, res) => {
    try {
        const materials = await MaterialsSchema.findOne({ _id: req.params.id });
        if (materials) {
            res.status(200).json({message: materials});
        } else {
            res.status(404).json({ message: { error: "Nenhuma matéria disponível." } });
        }
        
    } catch(error){
        res.status(500).json({ message: { error: "Erro interno tente mais tarde" } });
    }
}

const updateMaterials = async (req, res) => {
    try {
        const material = await MaterialsSchema.findOne({_id: req.params.id});
        if(material){
            material.name = req.body.name || material.name
            res.status(200).json({message: material});
            await material.save();
        }
        
    } catch (error) {
        res.status(500).json({ message: { error: "Erro interno tente mais tarde" } }); 
    }
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