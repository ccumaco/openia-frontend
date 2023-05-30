<script setup lang='ts'>
import { reactive, ref } from "@vue/reactivity";
import { useFreeStyleStore } from "../stores/free-style-store";
import { useOpenIaStore } from "../stores/global-store";
import { useToast } from "primevue/usetoast";
import InputSearch from "../components/Input-search.vue";
import { storeToRefs } from "pinia";
//@ts-ignore
import VueMarkdownIt from 'vue3-markdown-it';


  const storeFreeStyle = useFreeStyleStore();
  const storeGlobal = useOpenIaStore();
  const toast = useToast();
  const { user } = storeToRefs(storeGlobal);
  const { context, loading } = storeToRefs(storeFreeStyle);
  const cutText = (text: string) => {
    return text.substring(0, 70) + '...';
  }
  const showSuccess = (textCliped: string) => {
    toast.add({severity:'success', summary: 'Texto copiado', detail: cutText(textCliped), life: 3000});
  }
  const mainSeach = 'free-style';
  
</script>

<template>
  <div class="el_cont_backgorund"></div>
  <div class="el_container">
    <div class="el_container__1280">
      <div class='el_cont--scroll'>
  <div class="el_texto">
    <h1>Automatiza tareas y optimiza tus procesos escribiendo más rápido</h1>
    <h2>¡Pruébame ahora y saca beneficio a mis posibilidades!</h2>
  </div>
  <div class="el_cards" v-if='context.length == 0'>
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
  <!-- <div class="el_parrafo" v-if='context.length == 0'>
    <p>Aquí aparecerá tu texto cuando sea generado por Arquitext</p>
  </div> -->
  <div class="saludo">
    <p>¡Hola yo soy Arquitext!</p> 
    <p>¿En qué puedo ayudarte hoy?</p>
	</div>
  
    <div
      v-for="(text, index) of context"
      class="el_cont_mensajes"
      :class='text.role == "user" ? "user" : "assistant"'
      >
      <div class="el_cont_mensajes__dos">
        <p class="el_name">{{ user.userName }}</p>
        <div class="el_cont_mensajes__dos__card">
            <!-- <Markdown> -->
              <VueMarkdownIt :source='text.content'/>
            <!-- </Markdown> -->
        </div>
      </div>
    </div>
    <div v-if='loading'>
      <p class='big-title'>Estamos generando textos increíbles para ti. <span class="loader"></span></p>
      <p class='small-description'>Ten paciencia, podemos tardar algunos segundos en generar los textos</p>
    </div>
  </div>
</div>
</div>
<div class="el_cont">
  <div class="el_cont__buscador">
    <Toast />
    <InputSearch :mainSearch='mainSeach'/>
  </div>
</div>
</template>

<style lang='scss' scoped>
@import "./../styles/views/social-media.scss";
@import "./../styles/views/free-style.scss";
</style>