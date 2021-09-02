var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var CargoController = require("../controllers/CargoController");
var CentroCustoController = require("../controllers/CentroCustoController");
var DepartamentoController = require("../controllers/DepartamentoController");
var AdminAuth = require("../middleware/AdminAuth");
router.get('/', HomeController.index); 

//Rotas de usuarios
router.post('/user', UserController.create);
router.get('/user',AdminAuth, UserController.index);
router.get('/user/:id',AdminAuth, UserController.findOne);
router.put('/user',AdminAuth, UserController.edit);
router.delete('/user/:id',AdminAuth, UserController.delete);

//Rotas de Cargos
router.post('/cargo',AdminAuth, CargoController.create);
router.get('/cargo', CargoController.index);
router.get('/cargo/:id',AdminAuth, CargoController.findOne);
router.put('/cargo',AdminAuth, CargoController.edit);
router.delete('/cargo/:id',AdminAuth, CargoController.delete);

//Rotas de Centro de custos
router.post('/centroCusto',AdminAuth, CentroCustoController.create);
router.get('/centroCusto', CentroCustoController.index);
router.get('/centroCusto/:id',AdminAuth, CentroCustoController.findOne);
router.put('/centroCusto',AdminAuth, CentroCustoController.edit);
router.delete('/centroCusto/:id',AdminAuth, CentroCustoController.delete);

//Rotas de Departamentos
router.post('/departamento',AdminAuth, DepartamentoController.create);
router.get('/departamento', DepartamentoController.index);
router.get('/departamento/:id',AdminAuth, DepartamentoController.findOne);
router.put('/departamento',AdminAuth, DepartamentoController.edit);
router.delete('/departamento/:id',AdminAuth, DepartamentoController.delete);

router.post('/login', UserController.login);
router.post('/validate',AdminAuth, UserController.validate);


module.exports = router;