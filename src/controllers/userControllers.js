const UserSchema = require("../models/userSchema")
const bcrypt = require("bcrypt")

// Consultar úsuarios

const getAll = async (req, res) => {
    try {
        const notes = await UserSchema.find();
        res.status(200).send(notes);
    } catch(err) {
        res.status(500).send({
            "message": err
        })
    }
};

//Cria usuario 

const createUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword

    try {
        const newUser = new UserSchema(req.body)

        const savedUser = await newUser.save()

        res.status(200).json({
            message: "User adicionado com sucesso!",
            savedUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//Atualizar Usuario por ID

const updateUserById = async (req, res) => {
 
    try {
        const findUser = await UserSchema.findById(req.params.id)

        if (findUser) {
            findUser.name = req.body.name || findUser.name
            findUser.email = req.body.email || findUser.email
            findUser.course = req.body.course || findUser.course
        }

        const savedUser = await findUser.save()

        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            savedUser
        })
    }
    catch (error) {
        console.error(error)
    }

}

//deletar úsuario por ID

const deleteUserById = async (req, res) => {
    try {
        const userFound = await UserSchema.findById(req.params.id)

       await userFound.delete()

       res.status(200).json({
           mensagem: `Usuário '${userFound.email}' deletada com sucesso!`
       })

    } catch (err) {
        res.status(400).json({
            mensagem: err.message
        })
    }
} 

module.exports = {
    createUser,
    getAll,
    updateUserById,
    deleteUserById
}