<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a :class="'navbar-item '+(page=='user'?'active-tab':'')" href="/user" > Usuario </a>

          <a :class="'navbar-item '+(page=='cargo'?'active-tab':'')" href="/cargo"> Cargo </a>
          <a :class="'navbar-item '+(page=='departamento'?'active-tab':'')" href="/departamento"> Departamento </a>
           <a :class="'navbar-item '+(page=='centroCusto'?'active-tab':'')" href="/centroCusto"> Centro de custo </a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light" href="/logout"> Sair </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    page: String,
  },
};
</script>