
const mongoose = require("mongoose");

const educatorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true}, 
    permission: { type: String, default: "educator"},
    educatorInTheCourse: {
        type: [
            {type: mongoose.Schema.Types.ObjectId, ref: "CourseSchema", required: true}
        ]
    }
});

module.exports = mongoose.model("EducatorSchema", educatorSchema);