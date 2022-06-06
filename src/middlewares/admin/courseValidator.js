const expressValidator = require("express-validator");

const auth = expressValidator.checkSchema({
    name:{
        trim: true,
        isLength: {
            options: {min: 2}
        },
        errorMessage: "Nome do curso precisa ter pelo menos 2 caracteres"
    },
    description:{
        isLength: {
            options: {min: 2}
        },
        errorMessage: "Descrição do curso precisa ter pelo menos 2 caracteres"
    },
    duration:{
        isLength: {
            options: {min: 2}
        },
        errorMessage: "Duração do curso precisa ter pelo menos 2 caracteres"
    },
})

module.exports = {
    auth
}