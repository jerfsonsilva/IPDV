class HomeController{

    async index(req, res){
        res.send("API REST Teste IPDV");
    }

}

module.exports = new HomeController();