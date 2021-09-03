<template>
  <div class="modal modal-open">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Importar Usuarios CSV</p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('close')"
        ></button>
      </header>
      <section class="modal-card-body">
        <form ref="formVinculo" @submit="importarUsuarios">
          <div class="modal-body">
            <div class="column">
              <label>
                Arquivo CSV
                <input type="file" class="input" name="arquivo" accept=".csv" />
              </label>
            </div>
            <div class="column">
              <button type="submit" class="button">Importar</button>
              <br />
              <br />
            </div>

            <input ref="resetmodal" class="hidden" type="reset" />
            <h4 v-if="objetos.length">Lista de usuarios importados</h4>
            <table class="table is-fullwidth" v-if="objetos.length">
              <thead>
                <td>Nome</td>
                <td>Email</td>
                <td>Cargo</td>
                <td>Departamento</td>
                <td>Centro de custo</td>
                <td>Status</td>
              </thead>
              <tbody>
                <tr v-for="(item, key) in objetos" :key="key">
                  <td>{{ item.nome }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.cargo }}</td>
                  <td>{{ item.departamento }}</td>
                  <td>{{ item.centroCusto }}</td>
                  <td class="">
                    <span class="importado" v-if="item.status">{{
                      item.msg
                    }}</span>
                    <span class="n-importado" v-else>{{
                      item.msg
                    }}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="column">
              <br />
              <br />
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import env from "../../../env";
export default {
  name: "ImportarLista",
  props: ["buscarUsuarios"],
  data() {
    return {
      objetos: [],
    };
  },
  methods: {
    importarUsuarios(e) {
      this.objetos = [];
      e.preventDefault();

      var $this = this;
      // console.log(this.$refs.formVinculo);
      let formData = new FormData(this.$refs.formVinculo);

      axios
        .post(env.urlServidorBack + "/user/importar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status) {
            $this.$alertify.success("Importado com sucesso");
            $this.objetos = response.data.lista;
            $this.$refs.resetmodal.click();
            $this.buscarUsuarios();
          } else {
            $this.$alertify.error("Erro no processo");
          }
        });
    },
  },
};
</script>