var jwt = require("jsonwebtoken");
var env = require("../env")
module.exports = function(req,res,next){
    const authToken = req.headers['authorization']

    if(authToken != undefined){
        const bearer = authToken.split(' ');

        try {
            var decoded = jwt.verify(bearer[1],env.secret); //Verifica o token
            
            next();
        } catch (error) {
            res.status(403);
            res.send({err:'Voce não tem acesso'});
            return;
        }
     
    }else{
        res.status(403);
        res.send({err:'Voce não tem acesso'});
        return;
    }
}