const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    permission: { type: String, default: "aluno"},
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseSchema",
        required: true
    }

})

module.exports = mongoose.model("StudentSchema", StudentSchema);

