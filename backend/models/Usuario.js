var knex = require("../database/connection");
var bcrypt = require("bcrypt");

var nomeTabela = "Usuario";

class Usuario{

    async findAll(){
        try {
            var result = await knex.select("id","email","nome","FKIDcargo","FKIDdepartamento").table(nomeTabela);
            return result;
            
        } catch (error) {
            return [];
        }
    }

    async findDepartament(id){
        try {
            var result = await knex.select("id","email","nome","FKIDcargo","FKIDdepartamento").where({FKIDdepartamento:id}).table(nomeTabela);
            return result;
            
        } catch (error) {
            return [];
        }
    }
   
    async findById(id){
        try {
            var result = await knex.select("id","email","nome","FKIDcargo","FKIDdepartamento").where({id:id}).table(nomeTabela);
           if(result.length > 0 ) return result[0];
            else return undefined;
            
        } catch (error) {
            return undefined;
        }
    }
    async findByEmail(email){
        try {
            var result = await knex.select("id","password","email","nome").where({email:email}).table(nomeTabela);
           if(result.length > 0 ) return result[0];
            else return undefined;
            
        } catch (error) {
            return undefined;
        }
    }
    async create(email,password, nome,FKIDcargo,FKIDdepartamento){
        try {
            var hashSenha = await bcrypt.hash(password,8);//Criptografar senha
            await knex.insert({email,password:hashSenha,nome,FKIDcargo,FKIDdepartamento}).table(nomeTabela);//Cadastrar novo usuario
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }  
    }
    async update(id,email,password, nome,FKIDcargo,FKIDdepartamento){
         var user = await this.findById(id)
            if(user != undefined ){
                user.email = email;
                user.nome = nome;
                user.FKIDcargo = FKIDcargo;
                user.FKIDdepartamento = FKIDdepartamento;
                
                var hashSenha = await bcrypt.hash(password,8);//Criptografar senha
                user.password = hashSenha;

                try {
                    await knex.update(user).where({id:id}).table(nomeTabela);
                    return {status:true};
                } catch (error) {
                    return {status:false, err:error};
                }
            }else{
                return {status:false, err:"O usuario não existe"};
           }
            
       
    }
    async delete(id){
        var user = await this.findById(id)
        if(user != undefined ){
            try {
                await knex.delete().where({id:id}).table(nomeTabela);
                return {status:true};
            } catch (error) {
                return {status:false, err:error};
            }
        }else{
            return {status:false, err:"O usuario não existe"};
        }
    }

}

module.exports = new Usuario();