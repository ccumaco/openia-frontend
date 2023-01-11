<template>
    <div class="container--login">
      <h1 class="container--login--title mb-4">Crea tu cuenta ahora</h1>
      <!-- <button class="btn mt-3"><fa icon="angle-up" /> Continua con google</button>
      <p class="container--login--divisor mt-3">o</p> -->
        <InputText
          placeholder="Correo Electronico"
          type="email"
          name="email"
          id="email"
          v-model="objUser.userEmail"
          required
          class="mb-3 mt-3"
        />

        <InputText
          type="text"
          class="p-inputtext"
          placeholder="Nombre"
          name="password"
          id="password"
          v-model="objUser.userPassword"
          required
        />
      <div class="container--login__btns mt-4">
        <button class="btn come-back"><i class="pi pi-arrow-left"></i> Volver</button>
        <button class="btn continue" @click='store.register(objUser)'>
          Continuar <i class="pi pi-arrow-right"></i>
        </button>
      </div>
    </div>
  </template>
  
  
  <script lang='ts'>
  import { defineComponent, reactive, ref } from "vue";
  import { useOpenIaStore } from "../stores/global-store";
  export default defineComponent({
    components: {},
    methods: {},
    setup(props) {
      const some = ref(true)
      const objUser = reactive({
        userEmail: "carloscumaco5@gmail.com",
        userPassword: "contraseña"
      });
      const store = useOpenIaStore();
      return {
        some,
        store,
        objUser
      };
    },
  });
  </script>
  
  <style lang='scss'>
  @import "./../styles/views/login.scss";
  </style>