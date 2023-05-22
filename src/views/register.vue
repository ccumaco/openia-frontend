
<template>
    <div class="wrapper gift-background">
      <div class="cont-banner">
       <video width="100%" autoplay muted loop>
          <source src="/images/video-background.mp4" type="video/mp4">
          Your browser does not support HTML video.
        </video>
        <div class="--sombra"></div>
        <div class="--gradado-inferior"></div>
      </div>
      <div class="volver"><a href="#"><i class="pi pi-arrow-left mr-1"></i> Volver</a></div>
      <a href="/" class="logo_login"><img src="/images/logo-blanco.png"></a>
    <div class='content-register'>
        <h1>Registro</h1>
        <a href="#" class="google"><img src="/images/Icon-google.svg"/><p>Crear cuenta con google</p></a>
        <div class="o"><hr><p> o </p><hr></div>
        <form @submit.prevent='onFinish'>
        <label for="email">Correo Electrónico</label>
        <input type="email" name="" id="" v-model='formState.email'>
        <label for="password">Contraseña</label>
        <input type="password" name="" id="" autocomplete v-model='formState.password'>
        <label for="password">Confirmar contraseña</label>
        <input type="password" name="" id="" autocomplete v-model='formState.repassword'>
        <button type='submit' class="iniciar_sesion btn btn-home">Crear usuario</button>
        <p class="crear_cuenta">Ya tengo una cuenta. <a href="#"> Iniciar sesión</a></p>
        </form>
    </div>
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