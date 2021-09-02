# Teste IPDV

## Bem vindo(a)
```
npm install
```

## Este projeto foi dividido em tres etapas

## 1º) etapa - banco de dados localizado na pasta "/databaseipdv" contendo o script mysql e diagrama uml da aplicação

```
cd /databaseipdv
```

### basta importar o ipvd.sql para a sua maquina local e está configurado essa etapa


## 2º) etapa - O backend localizado na pasta "/backendipdv" construido utilizando o node js e conceitos de RestAPI

```
cd /backendipdv
```

### As dependencias estão localizadas no arquivo package.json

```
"dependencies": {
    "bcrypt": "^5.0.1",//Usado para criptografar as senhas
    "cors": "^2.8.5",//Para permitir o acesso a API dessa aplicação a aplicações localizadas em servidores diferentes da mesma
    "express": "^4.17.1",//Estrutura de aplicativo da web leve para ajudar a organizar seu aplicativo da web
    "jsonwebtoken": "^8.5.1",//Padrão da Internet para a criação de dados com assinatura opcional
    "knex": "^0.95.10",//O query builder
    "mysql2": "^2.1.0" //Acesso ao banco Mysql
  }
```

### para instalar basta rodar o comando
```
    npm install
```

### O arquivo "env.js" é responsavel pelas variaveis de ambientes sendo necessario configurar informações sobre o banco de dados e porta em que o servidor do backend ira rodar

```
module.exports = {//Variaveis de ambiente
    portaServidor:8686,//Porta de servidor
    conexao: {//Variaveis de conexão com o banco
        host : '127.0.0.1',
        user : 'root',
        password : '####',
        database : 'ipvdteste'//Nome da base de dados
      },
      secret : "$#!@#!@%##@!#AADX" //Secret do token de sessão
}
```

### apos a configuração basta rodar o comando:

```
node index.js
```

### e o servidor do backend estara pronto


## 3º) etapa - O frontend localizado na pasta "/frontendipdv"

```
cd /frontendipdv
```

### As dependencias estão localizadas no arquivo package.json

```
    "axios": "^0.21.1",//Cliente HTTP baseado em Promises para fazer requisições.
    "bulma": "^0.9.3",//Framework css
    "core-js": "^3.6.5",//É utilizado pelo Babel para garantir uma maior compatibilidade entre navegadores.
    "vue": "^2.6.11",//Construir a interface
    "vue-alertify": "^1.1.0",//Usado para criar alertas no sistema
    "vue-router": "^3.2.0"//Usado para gerenciar as rotas
```
### para instalar basta rodar o comando
```
    npm install
```

### No arquivo env.js podemos configurar informações sobre o acesso ao backend como a urlServidorBack, que se refere a url em que o servidor do backend esta rodando a aplicação para assim fazer a comunição com backend

```
module.exports = {//Variaveis de ambiente
    urlServidorBack:"http://localhost:8686",//Link servidor backend
}
```
### apos a configuração basta rodar o comando:

```
npm run serve
```

### e então será apresentado o link para acessar a aplicação

```
App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.0.109:8080/
```

