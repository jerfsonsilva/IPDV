var knex = require("../database/connection");
var bcrypt = require("bcrypt");

var nomeTabela = "CentroCusto";

class CentroCusto {
    async findAll() {
        try {
            var result = await knex.select("id", "descricao").table(nomeTabela);
            return result;

        } catch (error) {
            return [];
        }
    }
    async findById(id) {
        try {
            var result = await knex.select("id", "descricao").where({ id: id }).table(nomeTabela);
            if (result.length > 0) return result[0];
            else return undefined;

        } catch (error) {
            return undefined;
        }
    }
    async create(descricao) {
        try {
            await knex.insert({ descricao }).table(nomeTabela);//Cadastrar novo
            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async update(id, descricao) {
        var objeto = await this.findById(id)
        if (objeto != undefined) {
            objeto.descricao = descricao;
            try {
                await knex.update(objeto).where({ id: id }).table(nomeTabela);
                return { status: true };
            } catch (error) {
                return { status: false, err: error };
            }
        } else {
            return { status: false, err: "O Centro custo não existe" };
        }


    }
    async delete(id) {
        var user = await this.findById(id)
        if (user != undefined) {
            try {
                await knex.delete().where({ id: id }).table(nomeTabela);
                return { status: true };
            } catch (error) {
                return { status: false, err: error };
            }
        } else {
            return { status: false, err: "O Centro custo não existe" };
        }
    }
}

module.exports = new CentroCusto();