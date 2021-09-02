var express = require("express")
var env = require("./env")
var app = express()
var router = require("./routes/routes")
var cors = require('cors')

app.use(cors());//Permite que esta API seja acessada por aplicações que estejam em outros servidor

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.use("/",router);

app.listen(env.portaServidor,() => {
    console.log("Servidor rodando")
});
