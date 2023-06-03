
<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const userStore = useUserStore();

const formState = reactive({
    email: "",
    password: "",
});

const onFinish = async (values) => {
    const error = await userStore.loginUser(
        formState.email,
        formState.password
    );
    console.log(error, 'error error');
    if (!error) {
        console.log('hizo esto');
        return toast.add({severity:'success', summary: 'Bienvenido', life: 3000});
    }

    switch (error) {
        case "auth/user-not-found":
            return toast.add({severity:'error', summary: 'No existe el correo registrado', life: 3000});
            break;
        case "auth/wrong-password":
        return toast.add({severity:'error', summary: 'Error de contraseña', life: 3000});
            break;
            return toast.add({severity:'error', summary: 'Ocurrió un error en el servidor intentelo más tarde...', life: 3000});
            break;
    }
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};



</script>
<template>
    <Toast />
    <div class="wrapper gift-background">
      <div class="cont-banner">
       <video width="100%" autoplay muted loop>
          <source src="/images/video-background.mp4" type="video/mp4">
          Your browser does not support HTML video.
        </video>
        <div class="--sombra"></div>
        <div class="--gradado-inferior"></div>
      </div>
      <div class="volver"><router-link to='/'><i class="pi pi-arrow-left mr-1"></i> Volver</router-link></div>
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
                <p @click='userStore.resetPassword("carloscumaco5@gmail.com")' class="olv_pass"><RouterLink to="">Olvidé mi contraseña</RouterLink></p>
                <button type='submit' class="iniciar_sesion btn btn-home">Iniciar sesión</button>
                <p class="crear_cuenta">¿Aún no tienes cuenta? <router-link to='/register'> Creala aquí</router-link></p>
            </form>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import "../styles/views/login.scss";
</style>