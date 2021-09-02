<template>
  <div>
    <Navbar :page="'user'" />

    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Cadastro de usuario </p>
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
                    Nome
                    <input
                      required
                      type="text"
                      class="input"
                      placeholder="Nome do usuário"
                      name="nome"
                      v-model="form.nome"
                    />
                  </label>
                </div>
                <div class="column">
                  <label class="pt-4">
                    E-mail
                    <input
                      required
                      type="email"
                      class="input"
                      placeholder="Email"
                      name="email"
                      v-model="form.email"
                    />
                  </label>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <label class="pt-4">
                    Cargo

                    <select
                      name="FKIDcargo"
                      class="select input"
                      required=""
                      v-model="form.FKIDcargo"
                      placeholder="selecione"
                    >
                      <option value="" selected>Selecione...</option>
                      <option
                        v-for="cargo in cargos"
                        :value="cargo.id"
                        :key="cargo.id"
                      >
                        {{ cargo.descricao }}
                      </option>
                    </select>
                  </label>
                </div>
                <div class="column">
                  <label class="pt-4">
                    Departamento

                    <select
                      name="FKIDdepartamento"
                      class="select input"
                      required=""
                      v-model="form.FKIDdepartamento"
                    >
                      <option value="" selected>Selecione...</option>
                      <option
                        v-for="departamento in departamentos"
                        :value="departamento.id"
                        :key="departamento.id"
                      >
                        {{ departamento.descricao }}
                      </option>
                    </select>
                  </label>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <label class="pt-4">
                    Senha
                    <input
                      required
                      type="password"
                      class="input"
                      placeholder="Senha"
                      name="password"
                      v-model="form.password"
                    />
                  </label>
                </div>
                <div class="column">
                  <label class="pt-4">
                    Confirme a Senha
                    <input
                      required
                      type="password"
                      class="input"
                      placeholder="Confirmar a senha"
                      v-model="form.confirmarSenha"
                    />
                  </label>
                </div>
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
        nome: "",
        password: "",
        confirmarSenha: "",
        email: "",
        FKIDdepartamento: null,
        FKIDcargo: null,
      },
      cargos: [],
      departamentos: [],
    };
  },
  mounted() {
    if (this.id) {
      //Editar
      axios.get(env.urlServidorBack + "/user/" + this.id).then((response) => {
        //Buscar usuario
        this.form = response.data;
      });
    }
    axios.get(env.urlServidorBack + "/cargo").then((response) => {
      //Buscar cargos
      this.cargos = response.data;
    });

    axios.get(env.urlServidorBack + "/departamento").then((response) => {
      //Buscar departamentos
      this.departamentos = response.data;
    });
  },
  methods: {
    cadastrarEditar(e) {
      e.preventDefault();

      if (this.form.password != this.form.confirmarSenha) {
        this.$alertify.error("As senhas não coinciden");
        return;
      }
      if (this.id) {
        //Editar
        axios
          .put(env.urlServidorBack + "/user", this.form)
          .then((res) => {
            console.log(res);
            this.$alertify.success("Editado com sucesso");
            this.$router.push({ name: "ListaUsuario" });
          })
          .catch((err) => {
            var msg = err.response.data.err;
            this.$alertify.error(msg);
          });
      } else {
        axios
          .post(env.urlServidorBack + "/user", this.form)
          .then((res) => {
            console.log(res);
            this.$alertify.success("Cadastrado com sucesso");
            this.$router.push({ name: "ListaUsuario" });
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

