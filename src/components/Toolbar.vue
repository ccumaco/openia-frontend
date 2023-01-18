<template>
  <div>
    <nav class="primary-nav">
      <router-link to="/" class="logo">Incopy</router-link>
      <div class="primary-nav--rigth">
        <router-link
          v-if="store.user.userToken == null"
          to="/login"
          >
          <i class="pi pi-user mr-1"></i> Iniciar sesión
        </router-link>
        <p v-else>Bienvenido {{ store.user.userName }}</p>
        <router-link
          v-if="store.user.userToken == null"
          to="/register"
          class="primary-nav--register"
          >
          Crear cuenta
          </router-link
        >
        <p><i class="pi pi-bars mr-1"></i> Menu</p>
      </div>
    </nav>
  </div>
</template>

<script lang='ts'>
import { useOpenIaStore } from "../stores/global-store";

export default {
  setup() {
    const store = useOpenIaStore();
    return {
      store
    };
  },
};
</script>

<style lang='scss'>
@import "../styles/global-styles.scss";
.primary-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000000d9;
  position: fixed;
  top: 0;
  padding: 10px 30px;
  width: 100%;
  z-index: 3;
  color: $white;
  &--register{
    vertical-align: middle;
    border: 1px solid $white;
    padding: 7px 32px;
  }
  &--rigth {
    display: flex;
    align-items: center;
    gap: 40px;
  }
  .logo {
    font-size: 26px;
  }
  a {
    text-decoration: none;
    color: $white;
  }
}
</style>