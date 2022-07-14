const mongoose = require("mongoose");
const MaterialsSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    description: {type: String, required: true},
    id_educator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EducatorSchema",
        required: true
    },
    name_educator: {type: String, required: true},
    id_course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseSchema",
        required: true
    }

})

module.exports = mongoose.model("MaterialsSchema", MaterialsSchema);