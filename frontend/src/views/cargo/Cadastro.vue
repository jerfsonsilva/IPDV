<template>
  <div>
    <Navbar :page="'cargo'" />

    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Cadastro de cargo</p>
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
      },
    };
  },
  mounted() {
    if (this.id) {
      //Editar
      axios.get(env.urlServidorBack + "/cargo/" + this.id).then((response) => {
        //Buscar usuario
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
          .put(env.urlServidorBack + "/cargo", this.form)
          .then((res) => {
            console.log(res);
            this.$alertify.success("Editado com sucesso");
            this.$router.push({ name: "ListaCargo" });
          })
          .catch((err) => {
            var msg = err.response.data.err;
            this.$alertify.error(msg);
          });
      } else {
        axios
          .post(env.urlServidorBack + "/cargo", this.form)
          .then((res) => {
            console.log(res);
            this.$alertify.success("Cadastrado com sucesso");
            this.$router.push({ name: "ListaCargo" });
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

