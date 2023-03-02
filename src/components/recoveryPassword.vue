
<script lang='ts'>
import { defineComponent, ref, onMounted } from "vue";
import { useOpenIaStore } from "../stores/global-store";
export default defineComponent({
  name: 'recoveryPassword',
  props: {
    modalRecoveryPassword:{
      type: Boolean,
      default: false
    }  
  },
  setup() {
    const store = useOpenIaStore();
    const emailForgotten = ref("");
    return {
      store,
      emailForgotten,
    }
  }
});
</script>
<template>
  <Dialog :modal="modalRecoveryPassword" v-model:visible="modalRecoveryPassword" position="center">
    <template #header>
      <!-- empty header -->
      <h3></h3>
    </template>
    <div>
      <p class='text-center'>Enviaremos un mail de verificación para comprobar tu identidad</p>
      <p class="text-center my-4">Valide o ingrese su correo electrónico</p>
      <div class="p-float-label p-input-icon-right recovery-input">
        <i class="pi pi-envelope" />
        <InputText class='recovery-input' id="userEmail" aria-describedby="userEmail-error" v-model='emailForgotten' />
        <label for="userEmail">Email*</label>
      </div>

      <p :class='store.emailSent.status === 200 ? "success" : "error"' class='mt-3 text-center'>
        {{ store.emailSent.message }}</p>
    </div>

    <template #footer>
      <div class="flex justify-content-center">
        <button class="btn" @click='store.forgotPassword(emailForgotten)'
          :disabled='store.loading || emailForgotten.length < 15'>
          Enviar
        </button>
      </div>
    </template>
  </Dialog>
</template>

<style lang='scss'>

.recovery-input{
    width: 100%;
    max-width: 470px;
    margin: 0 auto;
    display: block;
}</style>