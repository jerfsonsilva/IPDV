var usuario = require("../models/Usuario");
var centroCusto = require("../models/CentroCusto");
var departamento = require("../models/Departamento");
var cargo = require("../models/Cargo");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var env = require("../env")

class UserController {
    async validate(req, res) {
        res.send("logado");
    }
    async index(req, res) {
        var FKIDdepartamento = req.query.FKIDdepartamento;

        if (FKIDdepartamento == undefined) {
            var users = await usuario.findAll();
        } else {
            var users = await usuario.findDepartament(FKIDdepartamento);
        }
        res.json(users);
    }
    async findOne(req, res) {
        var id = req.params.id;

        var user = await usuario.findById(id);

        if (user == undefined) {
            res.status(404);//Nenhum registro encontrado
            res.json({});
        } else {
            res.status = 200;
            res.json(user);
        }

    }
    async create(req, res) {
        var { email, nome, password, FKIDcargo, FKIDdepartamento } = req.body;

        //Validação
        if (FKIDdepartamento == undefined) {
            res.status(403);//Requisição invalida
            res.json({ err: "O departamento é obrigatorio" });
            return;
        }

        if (FKIDcargo == undefined) {
            res.status(403);//Requisição invalida
            res.json({ err: "O cargo é obrigatorio" });
            return;
        }

        if (email == undefined) {
            res.status(403);//Requisição invalida
            res.json({ err: "O e-mail é obrigatorio" });
            return;
        }
        // Verificar se email já existe no banco
        var userEmail = await usuario.findByEmail(email);
        if (userEmail != undefined) {
            res.status(403);//Requisição invalida
            res.json({ err: "O e-mail já esta cadastrado no banco" });
            return;
        }

        if (nome == undefined) {
            res.status(403);//Requisição invalida
            res.json({ err: "O nome é obrigatorio" });
            return;
        }

        if (password == undefined) {
            res.status(403);//Requisição invalida
            res.json({ err: "A senha é obrigatorio" });
            return;
        }

        let resultado = await usuario.create(email, password, nome, FKIDcargo, FKIDdepartamento);

        if (resultado) {
            res.status = 200;
            res.send('Cadastrado com sucesso');
        } else {
            res.status(503);
            res.json({ err: "Erro ao tentar realizar cadastro" });
        }


    }
    async edit(req, res) {
        var { id, email, nome, password, FKIDcargo, FKIDdepartamento } = req.body;
        let resultado = await usuario.update(id, email, password, nome, FKIDcargo, FKIDdepartamento);

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

        let resultado = await usuario.delete(id);

        if (resultado.status) {
            res.status = 200;
            res.send('Excluido com sucesso');
        } else {
            res.status(406);
            res.json(resultado.err);
        }

    }
    async login(req, res) {
        var { email, password } = req.body;

        var user = await usuario.findByEmail(email);

        if (user != undefined) {
            var resultado = await bcrypt.compare(password, user.password);

            if (resultado) {
                var tokenGerado = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),//Token expira em 1 hora
                    email: user.email,
                    id: user.id
                }, env.secret);
                res.json({ token: tokenGerado });
            } else {
                res.status(403);
                res.json({ status: false, err: "Senha incorreta" });
            }


        } else {
            res.status(403);
            res.json({ status: false, err: "Usuario não encontrado" });
        }

    }

    async import(req, res) {
        var resultado = [];
        var linhasArquivo = [];
        const Fs = require('fs');
        const CsvReadableStream = require('csv-reader');//Leitor de Csv

        const formidable = require('formidable');//Responsavel pelo recebimento de arquivos da requisição
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {//Receber arquivos do formulario

            let inputStream = Fs.createReadStream(files.arquivo.path, 'utf8');

            inputStream
                .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
                .on('data', async function (row) {
                    if (row.length > 0 && row[0].toLowerCase() != 'nome' && row.length == 5) {
                        let informacoes = {
                            nome: row[0],
                            email: row[1],
                            cargo: row[2],
                            departamento: row[3],
                            centroCusto: row[4]
                        };
                        linhasArquivo.push(informacoes);
                    }

                })
                .on('end', async function () {
                    await Promise.all(linhasArquivo.map(async (informacoes) => { //Esperar respostas 
                        if (informacoes.centroCusto != '') {
                            //Verificar a existencia do centro de custo
                            var centroObj = await centroCusto.findByDesc(informacoes.centroCusto);

                            if (centroObj == undefined) //cadastrar centro
                                informacoes.centroCustoid = await centroCusto.create(informacoes.centroCusto);
                            else
                                informacoes.centroCustoid = centroObj.id;

                        }

                        if (informacoes.cargo != '') {
                            //Verificar a existencia do cargo
                            var cargoObj = await cargo.findByDesc(informacoes.cargo);

                            if (cargoObj == undefined) //cadastrar cargo
                                informacoes.cargoid = await cargo.create(informacoes.cargo);
                            else
                                informacoes.cargoid = cargoObj.id;

                        }

                        if (informacoes.departamento != '' && informacoes.centroCusto != '') {
                            //Verificar a existencia do departamento
                            var departamentoObj = await departamento.findByDesc(informacoes.departamento);

                            if (departamentoObj == undefined) //cadastrar departamento
                                informacoes.departamentoid = await departamento.create(informacoes.departamento, informacoes.centroCustoid);
                            else
                                informacoes.departamentoid = departamentoObj.id;

                        }
                        if (informacoes.nome != '') {
                            //Verificar a existencia do usuario
                            var usuarioObj = await usuario.findByEmail(informacoes.email);

                            if (usuarioObj == undefined) { //cadastrar usuario
                                let idusuario = await usuario.create(informacoes.email, 'importado', informacoes.nome, informacoes.cargoid, informacoes.departamentoid);
                                informacoes.status = idusuario ? true : false;
                                informacoes.msg = idusuario ? 'Importado' : 'Erro ao importar';
                            } else {
                                informacoes.status = false;
                                informacoes.msg = "Usuario já existe no banco";
                            }
                        } else {
                            informacoes.status = false;
                            informacoes.msg = "Usuario invalido";
                        }
                        //console.log(informacoes);
                        resultado.push(informacoes);
                    }));
                    res.json({ status: true, lista: resultado });
                });
            console.log(resultado);

        });

    }
}

module.exports = new UserController();