<template>
  <div>
    <Navbar :page="'departamento'" />

    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Lista de departamentos</p>
          <a class="button is-info is-small mt-2" href="/departamento/novo"
            >Cadastrar +
          </a>
        </header>
        <div class="card-content">
             <div class="column is-offset-9 is-one-quarter">
            <select
              class="select input"
              required=""
              placeholder="Centro de custo"
              v-model="FKIDcentroCusto"
              @change="buscarDepartamentos()"
            >
              <option value="" selected>Centro de custo...</option>
              <option
                v-for="centro in listaCentroCusto"
                :value="centro.id"
                :key="centro.id"
              >
                {{ centro.descricao }}
              </option>
            </select>
          </div>

          <table class="table is-fullwidth">
            <thead>
              <td>Descrição</td>
              <td></td>
              <td></td>
            </thead>
            <tbody>
              <tr v-for="(item,key) in lista" :key="key">
                <td>{{ item.descricao }}</td>
                <td class="editar"><a :href="'/departamento/'+item.id">Editar </a>   </td>
                <td class="excluir" @click="excluir(item.id,key)">Excluir</td>
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
      FKIDcentroCusto:"",
      listaCentroCusto:[]
    };
  },
  mounted() {
    axios.get(env.urlServidorBack + "/centroCusto").then((response) => {
      //Buscar centroCusto
      this.listaCentroCusto = response.data;
    });
    this.buscarDepartamentos();
  },
  methods: {
     buscarDepartamentos() {
      axios.get(env.urlServidorBack + "/departamento"+(this.FKIDcentroCusto!=""?"?FKIDcentroCusto="+this.FKIDcentroCusto:"")).then((response) => {
        //Buscar departamentos
        this.lista = response.data;
      });
    },
    excluir(id,key) {
     var $this = this;
      this.$alertify.confirm(
        "Tem certeza que deseja excluir esse departamento?",
        function () {
          axios
            .delete(env.urlServidorBack + "/departamento/" + id)
            .then((response) => {
              console.log(response);
              $this.lista.splice(key,1);//Remover elemento da lista
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

