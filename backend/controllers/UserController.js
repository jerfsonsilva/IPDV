var usuario = require("../models/Usuario");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var env = require("../env")

class UserController{
    async validate(req, res){
       res.send("logado");
    }
    async index(req, res){
        var FKIDdepartamento = req.query.FKIDdepartamento;
 
        if(FKIDdepartamento==undefined){
            var users = await usuario.findAll();
        }else{
            var users = await usuario.findDepartament(FKIDdepartamento);
        }
       res.json(users);
    }
    async findOne(req, res){
        var id = req.params.id;
       
        var user = await usuario.findById(id);

        if(user == undefined){
            res.status(404);//Nenhum registro encontrado
            res.json({});
        }else{
            res.status =  200;
            res.json(user); 
        }
        
     }
    async create(req, res){
        var {email,nome,password,FKIDcargo,FKIDdepartamento} = req.body;
  
        //Validação
        //TODO Verificar se email já existe no banco
       
        if(FKIDdepartamento == undefined){
            res.status(403);//Requisição invalida
            res.json({err:"O departamento é obrigatorio"});
            return;
        }

        if(FKIDcargo == undefined){
            res.status(403);//Requisição invalida
            res.json({err:"O cargo é obrigatorio"});
            return;
        }

        if(email == undefined){
            res.status(403);//Requisição invalida
            res.json({err:"O e-mail é obrigatorio"});
            return;
        }
        var userEmail = await usuario.findByEmail(email);
        if(userEmail != undefined){
            res.status(403);//Requisição invalida
            res.json({err:"O e-mail já esta cadastrado no banco"});
            return;
        }

        if(nome == undefined){
            res.status(403);//Requisição invalida
            res.json({err:"O nome é obrigatorio"});
            return;
        }

        if(password == undefined){
            res.status(403);//Requisição invalida
            res.json({err:"A senha é obrigatorio"});
            return;
        }

        let resultado = await usuario.create(email,password,nome,FKIDcargo,FKIDdepartamento);
        
        if(resultado){
            res.status =  200;
            res.send('Cadastrado com sucesso');
        }else{
            res.status(503);
            res.json({err:"Erro ao tentar realizar cadastro"});
        }

        
    }
    async edit(req, res){
        var {id,email,nome,password,FKIDcargo,FKIDdepartamento} = req.body;
        let resultado = await usuario.update(id,email,password,nome,FKIDcargo,FKIDdepartamento);
        
        if(resultado.status){
            res.status =  200;
            res.send('Editado com sucesso');
        }else{
            res.status(406);
            res.json(resultado.err);
        }

     }
    async delete(req, res){
        var {id} = req.params;
    
        let resultado = await usuario.delete(id);
        
        if(resultado.status){
            res.status =  200;
            res.send('Excluido com sucesso');
        }else{
            res.status(406);
            res.json(resultado.err);
        }

     }
     async login(req,res){
        var {email,password} = req.body;

        var user = await usuario.findByEmail(email);

        if(user != undefined){
            var resultado = await bcrypt.compare(password,user.password);

            if(resultado){
                var tokenGerado = jwt.sign({
                    exp:Math.floor(Date.now() / 1000) + (60 * 60),//Token expira em 1 hora
                    email:user.email,
                    id:user.id
                },env.secret);
                res.json({token:tokenGerado});
            }else{
                res.status(403);
                res.json({status:false, err:"Senha incorreta"});
            }

           
        }else{
            res.status(403);
            res.json({status:false, err:"Usuario não encontrado"});
        }

     }
}

module.exports = new UserController();