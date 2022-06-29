const jwt = require("jsonwebtoken");
const UserAdmin = require("../../models/userAdminSchema");

const auth = async (req, res, next) => {

    if(!req.headers.authorization){
        res.status(401).json({message: "Acesso não permitido"});
    }

    const [authType, token] = req.headers.authorization.split(' ');
    if(authType != "Bearer"){
        res.status(401).json({message: "Acesso não permitido "});
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        const isAdmin = await UserAdmin.findOne({email: user.email});
        if(isAdmin.permission === "admin"){
            req.user = isAdmin;
            next()
        }else{
            res.status(401).json({message: "Acesso não permitido"});
        }
       
    } catch (error) {
        res.status(401).json({message: "Acesso não permitido"});
    }
}

module.exports = {
    auth
}