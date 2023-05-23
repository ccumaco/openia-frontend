
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
        <div class='content-login'>
            <h1>Acceso</h1>
            <div @click='userStore.loginWithGoogle' class="google"><img src="/images/Icon-google.svg"/><p> Iniciar sesión con google</p></div>
            <div class="o"><hr><p> o </p><hr></div>
            <form @submit.prevent='onFinish'>
                <label for="email">Correo Electrónico</label>
                <input type="email" id='email' v-model='formState.email'>
                <label for="password">Contraseña</label>
                <input type="password" autocomplete v-model='formState.password'>
                <p @click='userStore.resetPassword' class="olv_pass">Olvidé mi contraseña</p>
                <button type='submit' class="iniciar_sesion btn btn-home">Iniciar sesión</button>
                <p class="crear_cuenta">¿Aún no tienes cuenta? <router-link to='/register'> Creala aquí</router-link></p>
            </form>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import "../styles/views/login.scss";
</style>