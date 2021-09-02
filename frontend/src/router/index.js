import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/usuario/Login'

import CadastroUsuario from '../views/usuario/Cadastro'
import ListaUsuario from '../views/usuario/Lista'

import CadastroCargo from '../views/cargo/Cadastro'
import ListaCargo from '../views/cargo/Lista'

import CadastroCentroCusto from '../views/centroCusto/Cadastro'
import ListaCentroCusto from '../views/centroCusto/Lista'

import CadastroDepartamento from '../views/departamento/Cadastro'
import ListaDepartamento from '../views/departamento/Lista'

Vue.use(VueRouter)
import axios from "axios";

axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('token')}` };//Permissão para as rotas fazerem as requisições depois de logadas

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter:(to, from, next) => {
      localStorage.setItem('token',null);
      next('/');
    }
  },
  {
    path: '/user',
    name: 'ListaUsuario',
    component: ListaUsuario,
    beforeEnter: userLogado
  }, 
  {
    path: '/user/novo',
    name: 'CadastroUsuario',
    component: CadastroUsuario,
    beforeEnter: userLogado
  },
  {
    path: '/user/:id',
    name: 'EditarUsuario',
    props:true,
    component: CadastroUsuario,
    beforeEnter: userLogado
  },
  {
    path: '/cargo',
    name: 'ListaCargo',
    component: ListaCargo,
    beforeEnter: userLogado
  }, 
  {
    path: '/cargo/novo',
    name: 'CadastroCargo',
    component: CadastroCargo,
    beforeEnter: userLogado
  },
  {
    path: '/cargo/:id',
    name: 'EditarCargo',
    props:true,
    component: CadastroCargo,
    beforeEnter: userLogado
  },
  {
    path: '/centroCusto',
    name: 'ListaCentroCusto',
    component: ListaCentroCusto,
    beforeEnter: userLogado
  }, 
  {
    path: '/centroCusto/novo',
    name: 'CadastroCentroCusto',
    component: CadastroCentroCusto,
    beforeEnter: userLogado
  },
  {
    path: '/centroCusto/:id',
    name: 'EditarCentroCusto',
    props:true,
    component: CadastroCentroCusto,
    beforeEnter: userLogado
  },
  {
    path: '/departamento',
    name: 'ListaDepartamento',
    component: ListaDepartamento,
    beforeEnter: userLogado
  }, 
  {
    path: '/departamento/novo',
    name: 'CadastroDepartamento',
    component: CadastroDepartamento,
    beforeEnter: userLogado
  },
  {
    path: '/departamento/:id',
    name: 'EditarDepartamento',
    props:true,
    component: CadastroDepartamento,
    beforeEnter: userLogado
  },
]

function userLogado(to,from,next) {//Middleware verificar se o usuario esta logado
  if (localStorage.getItem('token') != undefined) {

    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    axios
      .post("http://localhost:8686/validate",{}, req) //validar token de usuario
      .then((res) => {
        console.log(res);
        next();
      })
      .catch((err) => {
        var msg = err.response.data.err;
        console.log(msg);
        next('/');
      });


  } else {
    next('/');
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
