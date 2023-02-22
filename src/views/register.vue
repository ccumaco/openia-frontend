
<template>
  <div class="form-demo">
    <Dialog
      v-model:visible="showMessage"
      :breakpoints="{ '960px': '80vw' }"
      :style="{ width: '30vw' }"
      modal
      position="center"
    >
      <div class="flex align-items-center flex-column">
        <i
          class="pi pi-check-circle mb-3"
          :style="{ fontSize: '5rem', color: 'var(--green-500)' }"
        ></i>
        <h5>Registro exitoso</h5>
        <p class='text-center mt-2'>
          ¡Bienvenido <b>{{ objUser.userName }}</b>!
        </p>
      </div>
      <template #footer>
        <div class="flex justify-content-center">
          <!-- i need create validation if have an account -->
          <router-link class='btn' to='/products'>Continuar</router-link>
        </div>
      </template>
    </Dialog>

    <div class="flex justify-content-center container-login align-items-center">
      <div class="card">
        <h1 class="text-center">Crea tu cuenta ahora</h1>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-user" />
              <InputText
                id="userName"
                v-model="v$.userName.$model"
                :class="{ 'p-invalid': v$.userName.$invalid && submitted }"
                aria-describedby="userName-error"
              />
              <label
                for="userName"
                :class="{ 'p-error': v$.userName.$invalid && submitted }"
                >Nombre</label
              >
            </div>
            <span v-if="v$.userName.$error && submitted">
              <span
                id="userName-error"
                v-for="(error, index) of v$.userName.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.userName.$invalid && submitted) || v$.userName.$pending.$response
              "
              class="p-error"
              >{{ v$.userName.required.$message.replace("Value", "Email") }}</small
            >
          </div>
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
                (v$.userEmail.$invalid && submitted) || v$.userEmail.$pending.$response
              "
              class="p-error"
              >{{ v$.userEmail.required.$message.replace("Value", "Email") }}</small
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
            <button class="btn" :disabled="store.loading">Crear cuenta</button>
          </div>
          <p class='text-center mt-6'>
            <router-link to='/login' s>
                Ya tengo una cuenta
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
  <Toast />
</template>

<script>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useOpenIaStore } from "../stores/global-store";
import { hasHistory } from '../utils';
import { useToast } from "primevue/usetoast";

export default {
  name: 'register',
  setup() {
    const store = useOpenIaStore()
    const toast = useToast();
    const objUser = reactive({
      userName: "",
      userEmail: "",
      userPassword: "",
    });

    const showError = () => {
      toast.add({severity:'error', summary: 'Ago ocurrio', detail: 'Intentalo de nuevo o mas tarde', life: 3000});
    }

    const rules = {
      userName: { required },
      userEmail: { required, email },
      userPassword: { required },
    };
    const submitted = ref(false);
    const showMessage = ref(false);

    const v$ = useVuelidate(rules, objUser);

    const handleSubmit = async (isFormValid) => {
      console.log('entrooo');
      submitted.value = true;
      
      if (!isFormValid) {
        return;
      }
      if (await store.register(objUser)) {
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
      objUser.userName = "";
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
      showError
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/views/login.scss";
</style>