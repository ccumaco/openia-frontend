
<template>
  <div class='content-login'>
    <h1>LOGIN</h1>
    <form @submit.prevent='onFinish'>
      <label for="email">Correo Electronico</label>
      <input type="email" id='email' v-model='formState.email'>
      <label for="password">Contraseña</label>
      <input type="password" autocomplete v-model='formState.password'>
      <button type='submit'>submit</button>
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
    email: "bluuweb1@test.com",
    password: "123123",
});

const onFinish = async (values) => {
    // console.log("Success:", values);
    const error = await userStore.loginUser(
        formState.email,
        formState.password
    );

    if (!error) {
        // return message.success("Bienvenidos a la super apps 💋");
    }

    switch (error) {
        case "auth/user-not-found":
            // message.error("No existe el correo registrado 💋");
            break;
        case "auth/wrong-password":
            // message.error("Error de contraseña 💋");
            break;
        default:
            // message.error(
            //     "Ocurrió un error en el servidor 💋 intentelo más tarde..."
            // );
            break;
    }
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
</script>

<style lang="scss" scoped>
@import "../styles/views/login.scss";
</style>