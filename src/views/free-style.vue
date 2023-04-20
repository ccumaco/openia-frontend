<script lang='ts'>
import { defineComponent } from "vue";
import { reactive, ref } from "@vue/reactivity";
import { useOpenIaStore } from "../stores/global-store";
import Loader from "../components/Loader.vue";
import { copy, makeScroll, removeTags } from "../utils/index";
import { useToast } from "primevue/usetoast";
import InputSearch from "../components/Input-search.vue";
export default defineComponent({
  name: 'free style view',
  components: { Loader, InputSearch },
  props: {},
  setup(props) {
    const store = useOpenIaStore();
    const toast = useToast();
    const cutText = (text: string) => {
      return text.substring(0, 70) + '...';
    }
    const showSuccess = (textCliped: string) => {
      toast.add({severity:'success', summary: 'Texto copiado', detail: cutText(textCliped), life: 3000});
    }
    const objectText = reactive({
      titlePrompt: '',
      prompt: "",
      language: "Español",
      soft: "Persuasivo",
    });
    const lenguajeResponse = (e: any) => {
      objectText.language = e.target.value;
    };
    const softMessage = (e: any) => {
      objectText.soft = e.target.value;
    };
    const languages = [
      "Español",
      "Inglés",
      "Francés",
      "Alemán",
      "Chino",
      "Ruso",
      "Portugués",
      "Italiano",
      "Japonés",
      "Javanés",
    ];

    const softs = [
      "Persuasivo",
      "Informativo",
      "Entretenido",
      "Gracioso",
      "Promocional",
      "Inspirador",
      "Neutro",
    ];
    return {
      objectText,
      store,
      languages,
      lenguajeResponse,
      softMessage,
      softs,
      copy,
      showSuccess,
      makeScroll,
      removeTags
    };
  },
});
</script>

<template>
  <div class="el_container">
    <div class="el_container__1280">
  <div class="el_texto">
    <h1>Automatiza tareas y optimiza tus procesos escribiendo más rápido</h1>
    <h2>¡Pruébame ahora y saca beneficio a mis posibilidades!</h2>
  </div>
  <div class="el_cards">
    <div class="el_cards__ind">
      <img src="/images/icons8-click-64.png"> 
        <p>Puedo ayudarte a responder preguntas de cualquier complejidad</p>
    </div>
    <div class="el_cards__ind">
      <img src="/images/icons8-idea-64.png"> 
        <p>Ofrecerte sugerencias sobre una amplia variedad de temas</p>
    </div>
    <div class="el_cards__ind">
      <img src="/images/icons8-texto-64.png"> 
        <p>Generar textos en diferentes estilos y formatos</p>
    </div>
    <div class="el_cards__ind">
      <img src="/images/icons8-mapa-mental-64.png"> 
        <p>Información sobre una amplia variedad de temas, desde ciencias, deportes, historia, tecnología y más.</p>
    </div>
    <div class="el_cards__ind">
      <img src="/images/icons8-lectura-64.png"> 
        <p>Si necesitas ayuda con la redacción de algún trabajo o simplemente quieres charlar</p>
    </div>
  </div>
  <div class="el_parrafo">
    <p>Aquí aparecerá tu texto cuando sea generado por Arquitext</p>
  </div>
  <div class="el_cont_mensajes" v-for="index in 6">
    <div class="el_cont_mensajes__dos">
    <p class="el_name">Miguel Cumaco</p>
    <div class="el_cont_mensajes__dos__card">
      <p>Redacta un contrato de arrendamiento para un apartamento el cual tiene una duración de un año el cual tiene como arrendador a Miguel Cumaco y arrendataria a Lorena Sierra, este contrato tiene un canon mensual de $800.000</p>
    </div>
  </div>
  </div>
</div>
</div>
<div class="el_cont">
  <div class="el_cont__buscador">
    <Toast />
    <InputSearch class='mt-2 mb-2'/>
  </div>
</div>
</template>

<style lang='scss'>
@import "./../styles/views/social-media.scss";
@import "./../styles/views/free-style.scss";
</style>