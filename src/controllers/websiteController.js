const nodemailer = require("nodemailer");

const home = (req, res) => {
    res.status(200).json({message: "Aqui é a home do website"});
}

const contact = async (req, res) => {
    try {
        const {name, email, message} = req.body;
        const userMail = process.env.USER_MAIL;
        const passwordMail = process.env.PASSWORD_MAIL;


        const transporter = nodemailer.createTransport({
            host:process.env.HOST_MAIL,
            port: process.env.PORT_MAIL,
            auth:{user: userMail, pass: passwordMail},
        })

       const send = await transporter.sendMail({
            from: userMail,
            to: userMail,
            replyTo: email,
            subject: `Você recebeu um contato de ${name}.`,
            text: message
        })
        if(!send){
            res.status(400).json({message: "Não foi possível enviar e-mail."});
        }
            res.status(200).json({success: "Seu e-mail foi enviado com sucesso!"})

    } catch (error) {
        res.status(500).json({message: "Erro interno. Tente mais tarde."});
    }
}

const teste = (req, res) => {
    res.status(200).json({message: "Aqui é o teste"});
}

module.exports = {
    home,
    contact,
    teste
}