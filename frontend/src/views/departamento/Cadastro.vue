<template>
  <div>
    <Navbar :page="'departamento'" />

    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Cadastro de departamento</p>
        </header>
        <div class="card-content">
          <form
            method="POST"
            ref="formVinculo"
            @submit="cadastrarEditar"
            enctype="multipart/form-data"
          >
            <div class="">
              <div class="columns">
                <div class="column is-two-fifths">
                  <label class="pt-4">
                    Descrição
                    <input
                      required
                      type="text"
                      class="input"
                      placeholder="descrição"
                      name="descricao"
                      v-model="form.descricao"
                    />
                  </label>
                </div>
                <div class="column">
                  <label class="pt-4">
                    Centro de custo

                    <select
                      name="FKIDcentroCusto"
                      class="select input"
                      required=""
                      v-model="form.FKIDcentroCusto"
                      placeholder="selecione"
                    >
                      <option value="" selected>Selecione...</option>
                      <option
                        v-for="centro in centros"
                        :value="centro.id"
                        :key="centro.id"
                      >
                        {{ centro.descricao }}
                      </option>
                    </select>
                  </label>
                </div>
              </div>

              <div class="columns">
                <button class="button is-success mp-37" type="submit">
                  Salvar
                </button>
              </div>
            </div>
          </form>
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
  props: ["id"],
  data() {
    return {
      form: {
        descricao: "",
        FKIDcentroCusto: null,
      },
      centros: [],
    };
  },
  mounted() {
    //Buscar lista de centros de Custo
    axios.get(env.urlServidorBack + "/centroCusto").then((response) => {
      this.centros = response.data;
    });

    if (this.id) {
      //Editar
      axios
        .get(env.urlServidorBack + "/departamento/" + this.id)
        .then((response) => {
          //Buscar departamento
          this.form = response.data;
        });
    }
  },
  methods: {
    cadastrarEditar(e) {
      e.preventDefault();

      if (this.id) {
        //Editar
        axios
          .put(env.urlServidorBack + "/departamento", this.form)
          .then((res) => {
            console.log(res);
            this.$alertify.success("Editado com sucesso");
            this.$router.push({ name: "ListaDepartamento" });
          })
          .catch((err) => {
            var msg = err.response.data.err;
            this.$alertify.error(msg);
          });
      } else {
        axios
          .post(env.urlServidorBack + "/departamento", this.form)
          .then((res) => {
            console.log(res);
            this.$alertify.success("Cadastrado com sucesso");
            this.$router.push({ name: "ListaDepartamento" });
          })
          .catch((err) => {
            var msg = err.response.data.err;
            this.$alertify.error(msg);
          });
      }
    },
  },
  components: {
    Navbar,
  },
};
</script>

