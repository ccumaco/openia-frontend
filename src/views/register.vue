
<template>
  <div class='content-register'>
    <h1>Register</h1>
    <form @submit.prevent='onFinish'>
      <input type="email" name="" id="" v-model='formState.email'>
      <input type="password" name="" id="" autocomplete v-model='formState.password'>
      <input type="password" name="" id="" autocomplete v-model='formState.repassword'>
      <button type='submit'>Crear usuario</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const userStore = useUserStore();

const formState = reactive({
    email: "carloscumaco5@gmail.com",
    password: "55555",
    repassword: "55555",
});

const validatePass = async (_rule, value) => {
    if (value === "") {
        return Promise.reject("Repita contraseña");
    }
    if (value !== formState.password) {
        return Promise.reject("No coinciden las contraseñas");
    }
    return Promise.resolve();
};

const onFinish = async (values) => {
    console.log("Success:", values);
    const error = await userStore.registerUser(
        formState.email,
        formState.password
    );
    if (!error) {
        // return message.success("Revisa tu correo electrónico y verificalo 💋");
    }

    switch (error) {
        case "auth/email-already-in-use":
            // message.error("Email ya registrado 💋");
            break;
        default:
            // message.error(
            //     "Ocurrió un error en el servidor 💋 intentelo más tarde..."
            // );
            break;
    }
};
</script>
<style lang="scss" scoped>
@import "../styles/views/login.scss";
</style>