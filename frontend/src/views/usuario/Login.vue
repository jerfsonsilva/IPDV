<template>
    <section class="hero is-light is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form
                method="POST"
                ref="formVinculo"
                @submit="logar"
                enctype="multipart/form-data"
                class="box"
              >
                <div class="field">
                  <label for="" class="label">Email</label>
                  <div class="control ">
                    <input
                      required
                      type="email"
                      class="input"
                      placeholder="Email"
                      name="email"
                      v-model="email"
                    />
                   
                  </div>
                </div>
                <div class="field">
                  <label for="" class="label">Password</label>
                  <div class="control ">
                    <input
                      required
                      type="password"
                      class="input"
                      placeholder="Senha"
                      name="password"
                      v-model="password"
                    />
                  
                  </div>
                </div>
             
                <div class="field">
                  <button class="button is-success" type="submit">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import axios from "axios";
import env from "../../../env";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    logar(e) {
      e.preventDefault();
      axios
        .post(env.urlServidorBack+"/login", {
          password: this.password,
          email: this.email,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('token')}` };//Permissão para as rotas fazerem as requisições depois de logadas
         
         this.$alertify.success("Logado com sucesso");
          this.$router.push({ name: "ListaUsuario" });
        })
        .catch((err) => {
          var msg = err.response.data.err;
          this.$alertify.error(msg);
        });
    },
  },
};
</script>

