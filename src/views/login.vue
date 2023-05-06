
<template>
  <div class="form-demo">
    <!-- dialog login fine -->
    <Dialog
      v-model:visible="showMessage"
      :breakpoints="{ '960px': '80vw' }"
      :style="{ width: '30vw' }"
      position="center"
      modal
    >
      <template #header>
        <span></span>
      </template>
      <div class="flex align-items-center flex-column ">
        <i
          class="pi pi-check-circle"
          :style="{ fontSize: '5rem', color: 'var(--green-500)', marginBottom: '20px' }"
        ></i>
        <h5>Bienvenido de nuevo</h5>
        <p class='mt-1'>
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
    <recoveryPassword
      :modal-recovery-password='modalRecoveryPassword' 
      :show-modal-password='showModalPassword'
      @closeModalRecovery='modalRecoveryPassword = !modalRecoveryPassword'
      :token='token'
      />

    <div class="flex justify-content-center container-login align-items-center">
      <div class="card">
        <h1 class="text-center">Iniciar Sesión</h1>
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
                >Correo electrónico</label
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
                >Contraseña</label
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
          <p class='text-center mt-4'>
            ¿Aún no tienes una cuenta?
            <router-link class='text-center my-4' to='/register'>
                Creala Aquí.
            </router-link>
          </p>
          <p class='text-center forgot-password my-4' @click='modalRecoveryPassword  = !modalRecoveryPassword'>
              Olvidé mi contraseña
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
import router from "../router";
import { useRoute } from "vue-router";
import recoveryPassword from '../components/recoveryPassword.vue'
export default {
  name: 'login',
  components: {
    recoveryPassword
  },
  setup() {
    
    const store = useOpenIaStore();
    
    const route = useRoute();
    const objUser = reactive({
      userEmail: "",
      userPassword: "",
    });
    const toast = useToast();
    

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
        setTimeout(() => {
          router.push('/products')
        }, 3000);
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

    let showModalPassword = ref(false);
    let modalRecoveryPassword = ref(false)

    const token = route.query.token
    const emailToken = route.query.email
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

    const closeModalRecovery = () => {
      console.log('closeModalRecovery closeModalRecovery');
      modalRecoveryPassword.value = !modalRecoveryPassword.value
    }

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
      showError,
      showModalPassword,
      closeModalRecovery,
      token
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/views/login.scss";
</style>