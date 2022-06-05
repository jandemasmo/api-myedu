const UserAdminSchema = require("../../models/userAdminSchema");
const bcrypt = require("bcrypt");
const expressValidator = require("express-validator");
const jwt = require("jsonwebtoken");




const dashboard = (req, res) =>{
    res.status(200).json({message: "Aqui é a o dashboard da universidade"});
}

const register = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req).formatWith(({msg}) => {
            return msg
        });
        if(!errors.isEmpty()){
            return res.status(401).json({ message: errors.mapped() });
        }


        const emailVerify = await UserAdminSchema.findOne({email: req.body.email});
        if(! emailVerify ){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const { name, email, password } = req.body;
            const newUserAdmin = new UserAdminSchema({ name, email, password});
            await newUserAdmin.save();
            res.status(200).json({message:{success: "Usuário admnin criado com sucesso"}, newUserAdmin});
        }else{
            return res.status(403).json({ message: {error: "Já existe um usuário com esse email"}}); 
        }
    } catch (error) {
        res.status(500).json({message: {error: "Erro interno. Tente novamente"}})
    }
}

const login = async  (req, res) => {
    try {
        const errors = expressValidator.validationResult(req).formatWith(({msg}) => {
            return msg
        });
        if(!errors.isEmpty()){
            return res.status(401).json({ message: errors.mapped() });
        }

        const userVerify = await UserAdminSchema.findOne({email: req.body.email})

        if(!userVerify){
           return res.status(401).json({ message: {error: "Usuário não cadastrado!"}}); 
        }

        const validatePassword = bcrypt.compareSync(req.body.password, userVerify.password)
        if(!validatePassword){
            return res.status(403).json({ message: {error: "E-mail ou password não inválido!"}}); 
        }

        const token = jwt.sign({email: userVerify.email}, process.env.JWT_SECRET_TOKEN )
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({message: {error: "Erro interno. Tente novamente"}})
    }
}



module.exports = {
    dashboard,
    register,
    login,
}