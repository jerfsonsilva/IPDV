<template>
  <div>
    <Navbar :page="'centroCusto'" />

    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Lista de centros de custo</p>
          <a class="button is-info is-small mt-2" href="/centroCusto/novo"
            >Cadastrar +
          </a>
        </header>
        <div class="card-content">
          <table class="table is-fullwidth">
            <thead>
              <td>Descrição</td>
              <td></td>
              <td></td>
            </thead>
            <tbody>
              <tr v-for="(item,key) in lista" :key="key">
                <td>{{ item.descricao }}</td>
                <td class="editar"><a :href="'/centroCusto/'+item.id">Editar </a>   </td>
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
    };
  },
  mounted() {
    axios.get(env.urlServidorBack + "/centroCusto").then((response) => {
      //Buscar centroCustos
      this.lista = response.data;
    });
  },
  methods: {
    excluir(id,key) {
     var $this = this;
      this.$alertify.confirm(
        "Tem certeza que deseja excluir esse Centro de Custo?",
        function () {
          axios
            .delete(env.urlServidorBack + "/centroCusto/" + id)
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

