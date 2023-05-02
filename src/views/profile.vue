<template>
    <div class='container-profile container'>
      <router-link to='/free-style' class='arrow-back'>
            <i class='pi pi-arrow-left mr-2 mb-2'></i> Volver
        </router-link>
        <h2 class='mb-2'>
          <i class='pi pi-user mr-2' :style='{fontSize: "1.5rem"}'></i>
          Cuenta
        </h2>
        <p class='mb-2'>{{ store.user.userEmail }}</p>
        <div class="flex justify-content-between">
          <p class='mb-2'>Contraseña: *********</p>
          <!-- <p @click='modalRecoveryPassword  = !modalRecoveryPassword'>Cambiar Contraseña
            <img src="/images/arrow-icon.svg" alt="arrow icon">
          </p> -->
        </div>
        <div class="flex">
          <p>Tienes un plan <strong> Gratuito </strong> con palabras ilimitadas</p>
        </div>
        <!-- <recoveryPassword
          :modal-recovery-password='modalRecoveryPassword' 
          :show-modal-password='showModalPassword'
          @closeModalRecovery='modalRecoveryPassword = !modalRecoveryPassword'
          :token='token'
        /> -->
    </div>
</template>
<script lang='ts'>

import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import { useOpenIaStore } from '../stores/global-store';
// import recoveryPassword from '../components/recoveryPassword.vue'
export default defineComponent({
  name: 'profile',
  props: {},
  components: {
    // recoveryPassword
  },
  setup() {
    const store = useOpenIaStore();
    const route = useRoute();
    onMounted(() => {
        store.validateToken()
    })
    let showModalPassword = ref(false);
    let modalRecoveryPassword = ref(false)

    const token = route.query.token as string
    const emailToken = route.query.email as string
    onMounted(async () => {
      let validToken;
      if (token) {
        validToken = await store.validateEmailToken({
          token,
          emailToken
        })
      }
      if (validToken) {
        showModalPassword.value = true
        modalRecoveryPassword.value = true
      }
    })
    return{
      store,
      modalRecoveryPassword,
      showModalPassword,
      token
    }
  }
})
</script>
<style lang='scss'>
@import "./../styles/views/profile.scss";
</style>