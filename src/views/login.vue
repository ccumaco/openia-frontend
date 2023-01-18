
<template>
  <div class="form-demo">
    <Dialog
      v-model:visible="showMessage"
      :breakpoints="{ '960px': '80vw' }"
      :style="{ width: '30vw' }"
      position="top"
    >
      <div class="flex align-items-center flex-column pt-6 px-3">
        <i
          class="pi pi-check-circle"
          :style="{ fontSize: '5rem', color: 'var(--green-500)' }"
        ></i>
        <h5>Registration Successful!</h5>
        <p :style="{ lineHeight: 1.5, textIndent: '1rem' }">
          Your account is registered under userName
          <b>{{ objUser.userName }}</b> ; it'll be valid next 30 days without
          activation. Please check <b>{{ objUser.userEmail }}</b> for activation
          instructions.
        </p>
      </div>
      <template #footer>
        <div class="flex justify-content-center">
          <Button @click="toggleDialog" class="p-button-text" label="oks" />
        </div>
      </template>
    </Dialog>

    <div class="flex justify-content-center align-items-center">
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
          <div class="flex">
            <Button
              icon="pi pi-arrow-left"
              label="Volver"
              class="mt-2 p-button-link"
              @click="hasHistory() ? $router.go(-1) : $router.push('/')"
            />
            <Button
              type="submit"
              label="Continuar"
              :disabled="store.loading"
              class="mt-2"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useOpenIaStore } from "../stores/global-store";
import { hasHistory } from '../utils';
export default {
  setup() {
    const store = useOpenIaStore();
    const objUser = reactive({
      userEmail: "",
      userPassword: "",
    });
    

    const rules = {
      userEmail: { required, email },
      userPassword: { required },
    };
    const submitted = ref(false);
    const showMessage = ref(false);

    const v$ = useVuelidate(rules, objUser);

    const handleSubmit = (isFormValid) => {
      submitted.value = true;
      if (!isFormValid) {
        console.log("no pasooo");
        return;
      }
      toggleDialog();
      store.login(objUser);
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
      hasHistory
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/views/login.scss";
</style>