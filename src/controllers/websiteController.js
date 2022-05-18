const home = (req, res) => {
    res.status(200).json({message: "Aqui é a home do website"});
}

module.exports = {
    home
}