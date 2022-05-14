const app = require("./src/app");
const PORT = process.env.PORT


app.listen(PORT, () => {
    try {
        console.log(`Servidor rodando na porta ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})

