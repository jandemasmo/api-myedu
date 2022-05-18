const expressValidator = require("express-validator");

const auth = expressValidator.checkSchema({
    email:{
        isEmail: true,
        normalizeEmail: true,
        errorMessage: "E-mail inválido"
    },
    password:{
        isLength: {
            options: {min: 2}
        },
        errorMessage: "Senha precisa de pelo menos 2 caracteres"
    }
})

module.exports = {
    auth
}