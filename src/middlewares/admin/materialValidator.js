const expressValidator = require("express-validator");

const auth = expressValidator.checkSchema({
    name:{
        trim: true,
        isLength: {
            options: {min: 2}
        },
        errorMessage: "Nome da matéria precisa ter pelo menos 2 caracteres"
    }
})

module.exports = {
    auth
}