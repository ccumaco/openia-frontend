
<template>
  <div class="form-demo">
    <!-- dialog login fine -->
    <Dialog
      v-model:visible="showMessage"
      :breakpoints="{ '960px': '80vw' }"
      :style="{ width: '30vw' }"
      position="center"
    >
      <div class="flex align-items-center flex-column pt-6 px-3">
        <i
          class="pi pi-check-circle"
          :style="{ fontSize: '5rem', color: 'var(--green-500)' }"
        ></i>
        <h5>Bienvenido de nuevo</h5>
        <p :style="{ lineHeight: 1.5, textIndent: '1rem' }">
          <b>{{ store.user.userName }}</b>
        </p>
      </div>
      <template #footer>
        <div class="flex justify-content-center">
          <router-link to='/products' class="btn">Comenzar</router-link>
        </div>
      </template>
    </Dialog>
    <!-- modal renovate password -->
    <Dialog
      :modal="modalRecoveryPassword"
      v-model:visible="modalRecoveryPassword"
      position="center"
    >
    <template #header>
      <!-- empty header -->
      <h3></h3>
    </template>
      <p class='text-center'>Enviaremos un mail de verificación para comprobar tu identidad</p>
      <p class="text-center my-4">Valide o ingrese su correo electrónico</p>
      <div class="p-float-label p-input-icon-right recovery-input">
        <i class="pi pi-envelope" />
        <InputText
          class='recovery-input'
          id="userEmail"
          aria-describedby="userEmail-error"
        />
        <label
          for="userEmail"
          >Email*</label
        >
      </div>

      <template #footer>
        <div class="flex justify-content-center">
          <div class="btn">Enviar</div>
        </div>
      </template>
    </Dialog>

    <div class="flex justify-content-center container-login align-items-center">
      <div class="card">
        <h1 class="text-center">Iniciar Sesion</h1>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope" />
              <InputText
                id="userEmail"
                v-model="v$.userEmail.$model"
                :class="{ 'p-invalid': v$.userEmail.$invalid && submitted }"
                aria-describedby="userEmail-error"
              />
              <label
                for="userEmail"
                :class="{ 'p-error': v$.userEmail.$invalid && submitted }"
                >Email*</label
              >
            </div>
            <span v-if="v$.userEmail.$error && submitted">
              <span
                id="userEmail-error"
                v-for="(error, index) of v$.userEmail.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.userEmail.$invalid && submitted) ||
                v$.userEmail.$pending.$response
              "
              class="p-error"
              >{{
                v$.userEmail.required.$message.replace("Value", "Email")
              }}</small
            >
          </div>
          <div class="field">
            <div class="p-float-label">
              <Password
                id="userPassword"
                v-model="v$.userPassword.$model"
                :class="{ 'p-invalid': v$.userPassword.$invalid && submitted }"
                toggleMask
                :feedback="false"
              >
              </Password>
              <label
                for="userPassword"
                :class="{ 'p-error': v$.userPassword.$invalid && submitted }"
                >Password*</label
              >
            </div>
            <small
              v-if="
                (v$.userPassword.$invalid && submitted) ||
                v$.userPassword.$pending.$response
              "
              class="p-error"
              >{{
                v$.userPassword.required.$message.replace("Value", "Password")
              }}</small
            >
          </div>
          <div class="flex justify-content-center">
            <router-link to='/' class="btn come-back mr-4">
              <i class='pi pi-arrow-left mr-2'></i>
              Volver
            </router-link>
            <button class="btn" :disabled="store.loading" type='submit'>Continuar</button>
          </div>
          <p class='text-center forgot-password my-4' @click='modalRecoveryPassword  = !modalRecoveryPassword'>
              Olvide mi contraseña
          </p>
        </form>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useOpenIaStore } from "../stores/global-store";
import { hasHistory } from '../utils';
import { useToast } from "primevue/usetoast";
export default {
  name: 'login',
  setup() {
    const store = useOpenIaStore();
    const objUser = reactive({
      userEmail: "",
      userPassword: "",
    });
    const toast = useToast();
    const modalRecoveryPassword = ref(false)

    const rules = {
      userEmail: { required, email },
      userPassword: { required },
    };
    const submitted = ref(false);
    const showMessage = ref(false);

    const showError = () => {
      toast.add({severity:'error', summary: 'Ago ocurrio', detail: 'Contraseña o email invalido', life: 3000});
    }

    const v$ = useVuelidate(rules, objUser);

    const handleSubmit = async (isFormValid) => {
      submitted.value = true;
      
      if (!isFormValid) {
        return;
      }
      if (await store.login(objUser)) {
        toggleDialog();
        return
      } else {
        showError()
      }
    };
    const toggleDialog = () => {
      showMessage.value = !showMessage.value;

      if (!showMessage.value) {
        resetForm();
      }
    };
    const resetForm = () => {
      objUser.userEmail = "";
      objUser.userPassword = "";
      submitted.value = false;
    };

    return {
      objUser,
      v$,
      handleSubmit,
      toggleDialog,
      submitted,
      showMessage,
      store,
      hasHistory,
      modalRecoveryPassword,
      showError
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/views/login.scss";
</style>