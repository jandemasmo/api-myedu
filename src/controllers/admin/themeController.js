const ThemeSchema = require("../../models/themeSchema");

const addTheme = async (req, res) => {
    try {
        const { name, videoLessons, description, id_materials } = req.body;
        if (!name || !videoLessons || !description || !id_materials) {
            return res.status(401).json({ message: { error: "Preencha todos os campos" } });
        }
        const newTheme = await new ThemeSchema({ name, videoLessons, description, id_materials });
        await newTheme.save();
        res.status(200).json({ message: { success: newTheme } });
    } catch (error) {
        res.status(500).json({ message: { error: "Erro interno. Tente mais tarde." } });
    }
}

const getAllTheme = async (req, res) => {
    try {
        const allTheme = await ThemeSchema.find();
        if (allTheme) {
            res.status(200).json({ message: { success: allTheme } });
        }
    } catch (error) {
        res.status(500).json({ message: { error: "Erro interno. Tente mais tarde." } });
    }
}

const getTheme = async (req, res) => {
    try {
        const theme = await ThemeSchema.findOne({ _id: req.params.id });
        if (theme) {
            res.status(200).json({ message: { success: theme } });
        }
    } catch (error) {
        res.status(500).json({message: {error: "Erro interno. Tente mais tarde."}})
    }
}

const updateTheme = async (req, res) => {
    try {
        const updatedTheme = await ThemeSchema.findOne({_id: req.params.id});
        if(updatedTheme){
            updatedTheme.name = req.body.name || updatedTheme.name;
            updatedTheme.videoLessons = req.body.videoLessons || updatedTheme.videoLessons;
            updatedTheme.description = req.body.description || updatedTheme.description;
            updatedTheme.id_materials = req.body.id_materials || updatedTheme.id_materials;
            await updatedTheme.save();
            res.status(200).json({ message: { success: updatedTheme } });
        }
    } catch (error) {
        res.status(500).json({message: {error: "Erro interno. Tente mais tarde."}})
    }
}

const deleteTheme = (req, res) => {

}


module.exports = {
    addTheme,
    getAllTheme,
    getTheme,
    updateTheme,
    deleteTheme
}