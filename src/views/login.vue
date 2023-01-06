<template>
  <div class="container--login">
    <h1 class="container--login--title">Crea tu cuenta ahora</h1>
    <button class="btn mt-3"><fa icon="angle-up" /> Continua con google</button>
    <p class="container--login--divisor mt-3">o</p>
    <div class="input">
      <input
        placeholder="Nombre"
        type="text"
        name="name"
        id="name"
        v-model="objUser.name"
        required
        class="mt-3"
      />
      <input
        placeholder="Correo Electronico"
        type="email"
        name="email"
        id="email"
        v-model="objUser.email"
        required
        class="mt-3"
      />
    </div>
    <div class="container--login__btns mt-4">
      <button class="btn come-back"><fa icon="angle-left" /> Volver</button>
      <button class="btn continue" disabled>
        Continuar <fa icon="angle-right" />
      </button>
    </div>
  </div>
</template>


<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  data() {
    const objUser = {
      name: "user name",
      email: "carloscumaco5@gmail.com",
    };
    return {
      objUser,
    };
  },
  methods: {},
  setup(props) {
    return {};
  },
});
</script>

<style lang='scss'>
@import "./../styles/views/login.scss";
</style>