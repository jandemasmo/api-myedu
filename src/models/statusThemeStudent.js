const mongoose = require("mongoose");

const StatusThemeStudent = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentSchema",
        required: true
    },
    id_theme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ThemeSchema",
        required: true
    },
    status: { type: Boolean, required: true, default: false}
})


module.exports = mongoose.model("StatusThemeStudent", StatusThemeStudent);