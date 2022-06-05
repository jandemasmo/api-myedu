const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: [
        {
            type: String,
            enum: [
                "3 semestres", 
                "4 semestres", 
                "5 semestres", 
                "6 semestres", 
                "7 semestres", 
                "8 semestres", 
                "9 semestres", 
                "10 semestres", 
                "11 semestres", 
                "12 semestres"
            ]
        }
    ], required: true},
    createdAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now},
})

module.exports =  mongoose.model("CourseSchema", courseSchema);