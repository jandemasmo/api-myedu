const jwt = require("jsonwebtoken");
const StudentSchema = require("../../models/studentSchema");

const auth = async (req, res, next) => {

    if(!req.headers.authorization){
        res.status(401).json({message: "Acesso não permitido"});
    }

    const [authType, token] = req.headers.authorization.split(' ');
    if(authType != "Bearer"){
        res.status(401).json({message: "Acesso não permitido "});
    }

    try {
        const student = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        const isStudent = await StudentSchema.findOne({email: student.email});
        if(isStudent.permission === "aluno"){
            req.user = isStudent;
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