<template>
    <div class='container-profile container'>
      <router-link to='/products' class='arrow-back'>
            <i class='pi pi-arrow-left mr-2 '></i> Volver
        </router-link>
        <h2>
          <i class='pi pi-user mr-2' :style='{fontSize: "1.5rem"}'></i>
          Cuenta
        </h2>
        <p>{{ store.user.userEmail }}</p>
        <div class="flex justify-content-between">
          <p>Contraseña: *********</p>
          <p>Cambiar Contraseña
            <img src="/images/arrow-icon.svg" alt="arrow icon">
          </p>
        </div>
        <div class="flex">
          <p>Tienes un plan<strong> Gratuito</strong></p>
          <p>Palabras Ilimitadas</p>
        </div>
    </div>
</template>
<script lang='ts'>

import { defineComponent, onMounted } from 'vue';
import { useOpenIaStore } from '../stores/global-store';
export default defineComponent({
  name: 'profile',
  props: {},
  setup() {
    const store = useOpenIaStore();
    onMounted(() => {
        store.validateToken()
    })
    return{
      store
    }
  }
})
</script>
<style lang='scss'>
@import "./../styles/views/profile.scss";
</style>