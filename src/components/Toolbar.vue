<template>
  <div>
    <nav class="primary-nav">
      <router-link to="/" class="logo">Incopy</router-link>
      <div class="primary-nav--rigth">
        <router-link to="/login">Iniciar sesión</router-link>
        <router-link to="/register">Registrate</router-link>
        <p>Menu</p>
      </div>
    </nav>
  </div>
</template>

<script setup>
</script>

<style lang='scss'>
  @import '../styles/global-styles.scss';
  .primary-nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:#000000D9;
    position: fixed;
    top: 0;
    padding: 10px 30px;
    width: 100%;
    z-index: 3;
    color: $white;
    &--rigth{
      display: flex;
      gap: 20px;
    }
    .logo{
      font-size: 26px;
    }
    a{
      text-decoration: none;
      color: $white;
    }
  }
</style>