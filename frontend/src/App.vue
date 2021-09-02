<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
.editar {
  color: #42b983;
}
.excluir {
  color: red;
  cursor: pointer;
}
.active-tab {
  background-color: #00d1b2;
  color: #000;
}
.mp-37 {
  margin-top: 37px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
