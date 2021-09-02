var departamento = require("../models/Departamento");
var env = require("../env")

class DepartamentoController{
    async index(req, res){
        var FKIDcentroCusto = req.query.FKIDcentroCusto;
 
        if(FKIDcentroCusto==undefined){
            var lista = await departamento.findAll();
        }else{
            var lista = await departamento.findCostCenter(FKIDcentroCusto);
        }

       res.json(lista);
    }
    async findOne(req, res) {
        var id = req.params.id;

        var objeto = await departamento.findById(id);

        if (objeto == undefined) {
            res.status(404);//Nenhum registro encontrado
            res.json({});
        } else {
            res.status = 200;
            res.json(objeto);
        }

    }
    async create(req, res) {
        var { descricao,FKIDcentroCusto } = req.body;

        //Validação
        if (descricao == undefined) {
            res.status(403);//Requisição invalida
            res.json({ err: "A descrição é obrigatoria" });
            return;
        }

        if (FKIDcentroCusto == undefined) {
            res.status(403);//Requisição invalida
            res.json({ err: "O centro de custo é obrigatorio" });
            return;
        }

        let resultado = await departamento.create(descricao, FKIDcentroCusto);

        if (resultado) {
            res.status = 200;
            res.send('Cadastrado com sucesso');
        } else {
            res.status(503);
            res.json({ err: "Erro ao tentar realizar cadastro" });
        }


    }
    async edit(req, res) {
        var { id, descricao, FKIDcentroCusto } = req.body;
        let resultado = await departamento.update(id, descricao, FKIDcentroCusto);

        if (resultado.status) {
            res.status = 200;
            res.send('Editado com sucesso');
        } else {
            res.status(406);
            res.json(resultado.err);
        }

    }
    async delete(req, res) {
        var { id } = req.params;

        let resultado = await departamento.delete(id);

        if (resultado.status) {
            res.status = 200;
            res.send('Excluido com sucesso');
        } else {
            res.status(406);
            res.json(resultado.err);
        }

    }
}

module.exports = new DepartamentoController();