const mongoose = require("mongoose");

const userAdmin = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    permission: { type: String, default: "admin"}
})

module.exports = mongoose.model("UserAdmin", userAdmin);