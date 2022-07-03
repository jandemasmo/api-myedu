const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    videoLessons: {type: String, required: true},
    description: {type: String, required: true},
    id_materials: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MaterialsSchema",
        required: true
    }
})


module.exports = mongoose.model("ThemeSchema", ThemeSchema);