
<script lang='ts'>
import { defineComponent, ref, watch } from "vue";
import { useOpenIaStore } from "../stores/global-store";
export default defineComponent({
  name: 'recoveryPassword',
  props: {
    modalRecoveryPassword:{
      type: Boolean,
      default: false
    },
    showModalPassword: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const store = useOpenIaStore();
    const emailForgotten = ref("");
    const repeatNewPassword = ref("");
    const newPassword = ref("")
    const myModal = ref(props.modalRecoveryPassword)
    watch(() => props.modalRecoveryPassword, (newValue, oldValue) => {
      myModal.value = newValue;
    });
    return {
      store,
      emailForgotten,
      newPassword,
      repeatNewPassword,
      myModal
    }
  }
});
</script>
<template>
  <Dialog :modal="myModal" :closable='false' v-model:visible="myModal" position="center">
    <i class='pi pi-times icon-close' @click='$emit("closeModalRecovery")'></i>
    <div v-if='!showModalPassword && !store.passwordChanged'>
      <p class='text-center'>Enviaremos un mail de verificación para comprobar tu identidad</p>
      <p class="text-center my-4">Valide o ingrese su correo electrónico</p>
      <div class="p-float-label p-input-icon-right recovery-input">
        <i class="pi pi-envelope" />
        <InputText class='recovery-input' id="userEmail" aria-describedby="userEmail-error" v-model='emailForgotten' />
        <label for="userEmail">Email*</label>
      </div>

      <p
        v-if='store.emailSent.message.length' 
        :class='store.emailSent.status === 200 ? "success" : "error"' class='mt-3 text-center'>
        {{ store.emailSent.message }}</p>
    </div>
    <div v-if='showModalPassword && !store.passwordChanged'>
      <p class='text-center mb-4'>Ingresa tu nueva contraseña</p>
      <div class="p-float-label">
        <Password
          id="newPassword"
          v-model="newPassword"
          toggleMask
          :feedback="false"
        >
        </Password>
        <label
          for="newPassword"
          >Nueva Contraseña</label
        >
      </div>
      <div class="p-float-label mt-4">
          <Password
            id="repeatNewPassword"
            v-model="repeatNewPassword"
            toggleMask
            :feedback="false"
          >
          </Password>
          <label
            for="repeatNewPassword"
            >Repetir contraseña</label
          >
        </div>
    </div>

    <template #footer>
      <div class="flex justify-content-center" v-if='!showModalPassword && !store.passwordChanged'>
        <button class="btn" @click='store.forgotPassword(emailForgotten)'
          :disabled='store.loading || emailForgotten.length < 15'>
          Enviar
        </button>
      </div>
      <div class='flex justify-content-center' v-if='showModalPassword && !store.passwordChanged'>
        <button class="btn" @click='store.asingNewPassword(newPassword, repeatNewPassword, token)'
          :disabled='store.loading || newPassword != repeatNewPassword || newPassword.length < 5'>
          Confirmar
        </button>
      </div>
      <div class="p-dialog-content" v-if='store.passwordChanged'>
        Se a cambiado la contraseña correctamente
      </div>
    </template>
  </Dialog>
</template>

<style lang='scss' scoped>
.icon-close{
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  padding: 10px;
}
.recovery-input{
    width: 100%;
    max-width: 470px;
    margin: 0 auto;
    display: block;
}</style>