var centroCusto = require("../models/CentroCusto");
var env = require("../env")

class CentroCustoController {
    async index(req, res) {
        var lista = await centroCusto.findAll();
        res.json(lista);
    }
    async findOne(req, res) {
        var id = req.params.id;

        var objeto = await centroCusto.findById(id);

        if (objeto == undefined) {
            res.status(404);//Nenhum registro encontrado
            res.json({});
        } else {
            res.status = 200;
            res.json(objeto);
        }

    }
    async create(req, res) {
        var { descricao } = req.body;

        //Validação
        if (descricao == undefined) {
            res.status(403);//Requisição invalida
            res.json({ err: "A descrição é obrigatoria" });
            return;
        }

        let resultado = await centroCusto.create(descricao);

        if (resultado) {
            res.status = 200;
            res.send('Cadastrado com sucesso');
        } else {
            res.status(503);
            res.json({ err: "Erro ao tentar realizar cadastro" });
        }


    }
    async edit(req, res) {
        var { id, descricao } = req.body;
        let resultado = await centroCusto.update(id, descricao);

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

        let resultado = await centroCusto.delete(id);

        if (resultado.status) {
            res.status = 200;
            res.send('Excluido com sucesso');
        } else {
            res.status(406);
            res.json(resultado.err);
        }

    }
}

module.exports = new CentroCustoController();