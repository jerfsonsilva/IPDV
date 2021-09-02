<template>
  <div>
    <Navbar :page="'user'" />

    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Lista de usuarios</p>
          <a class="button is-info is-small mt-2" href="/user/novo"
            >Cadastrar +
          </a>
          <a class="button is-info is-small mt-2" href="/user/novo"
            > 
            Importar usuarios 

          </a>
        </header>
        <div class="card-content">
          <div class="column is-offset-9 is-one-quarter">
            <select
              class="select input"
              required=""
              placeholder="Departamento"
              v-model="FKIDdepartamento"
              @change="buscarUsuarios()"
            >
              <option value="" selected>Departamento...</option>
              <option
                v-for="departamento in listaDepartamento"
                :value="departamento.id"
                :key="departamento.id"
              >
                {{ departamento.descricao }}
              </option>
            </select>
          </div>

          <table class="table is-fullwidth">
            <thead>
              <td>Nome</td>
              <td>Email</td>
              <td></td>
              <td></td>
            </thead>
            <tbody>
              <tr v-for="(item, key) in lista" :key="key">
                <td>{{ item.nome }}</td>
                <td>{{ item.email }}</td>
                <td class="editar">
                  <a :href="'/user/' + item.id">Editar </a>
                </td>
                <td class="excluir" @click="excluir(item.id, key)">Excluir</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import env from "../../../env";
import Navbar from "../../components/layout/Navbar.vue";

export default {
  data() {
    return {
      lista: [],
      listaDepartamento: [],
      FKIDdepartamento: "",
    };
  },
  mounted() {
    axios.get(env.urlServidorBack + "/departamento").then((response) => {
      //Buscar departamentos
      this.listaDepartamento = response.data;
    });
    this.buscarUsuarios();
  },
  methods: {
    buscarUsuarios() {
      axios.get(env.urlServidorBack + "/user"+(this.FKIDdepartamento!=""?"?FKIDdepartamento="+this.FKIDdepartamento:"")).then((response) => {
        //Buscar servidores
        this.lista = response.data;
      });
    },
    excluir(id, key) {
      var $this = this;
      this.$alertify.confirm(
        "Tem certeza que deseja excluir esse usuario?",
        function () {
          axios
            .delete(env.urlServidorBack + "/user/" + id)
            .then((response) => {
              console.log(response);
              $this.lista.splice(key, 1); //Remover elemento da lista
              $this.$alertify.success(response.data);
            })
            .catch((err) => {
              if (err.response != undefined) {
                var msg = err.response.data.err;
                $this.$alertify.error(msg);
              }
            });
        }
      );
    },
  },
  components: {
    Navbar,
  },
};
</script>

