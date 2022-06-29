const mongoose = require("mongoose");
const MaterialsSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    id_course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseSchema",
        required: true
    }

})

module.exports = mongoose.model("MaterialsSchema", MaterialsSchema);