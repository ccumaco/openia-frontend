<script lang='ts'>
import { defineComponent } from "vue";
import { reactive, ref } from "@vue/reactivity";
import { useOpenIaStore } from "../stores/global-store";
export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const store = useOpenIaStore();
    const objectText = reactive({
      prompt: "has una pregunta",
      maxLength: 100,
      top_p: 1,
	  language: 'Español',
	  soft: 'Persuasivo'
    });
    const generateDiferentResponse = async () => {
      objectText.top_p = 1;
      await store.searchWithText(objectText);
    };
	const lenguajeResponse = (e: any) => {
		objectText.language = e.target.value
	}
	const softMessage = (e: any) => {
		objectText.soft = e.target.value
	}
	const languages = ['Español', 'Inglés', 'Francés', 'Alemán', 'Chino', 'Ruso', 'Portugués', 'Italiano', 'Japonés', 'Javanés'];
	const softs = ['Persuasivo', 'Informativo', 'Entretenido', 'Gracioso', 'Promocional', 'Inspirador', 'ofensivo']
    return {
      generateDiferentResponse,
      objectText,
      store,
	  languages,
	  lenguajeResponse,
	  softMessage,
	  softs
    };
  },
});
</script>

<template>
  <div class="container container-social">
    <div class="container-social__content">
      <h2 class="container-social__content--title">
        Crea una publicación para redes sociales
      </h2>
      <p class="container-social__content--description">
        Con esta plantilla crea una publicacion de manera facil y rapida, solo
        escribe ty idea y configura las opciones para obtener el textp
      </p>
      <div class="input">
        <label for="prompt">Consulta</label>
        <input
          type="text"
          name="prompt"
          placeholder="Has tu consulta"
          v-model="objectText.prompt"
		  @keyup.enter='store.searchWithText(objectText)'
        />
      </div>
      <div class="input">
        <label for="maxLength">Maxima longitud</label>
        <input
          type="number"
          name="maxLength"
          placeholder="Selecciona la cantidad maxima del texto"
          v-model="objectText.maxLength"
        />
      </div>
	  <div class="select">
		<label for="language">Idioma de salida</label>
		<select name="language" id="language" @change='lenguajeResponse($event)'>
			<option :value="language" v-for="(language, index) in languages" :key='index'>
				{{ language }}
			</option>
		</select>
	  </div>
	  <div class="select">
		<label for="soft">Tono del mensaje</label>
		<select name="soft" id="soft" @change='softMessage($event)'>
			<option :value="soft" v-for="(soft, index) in softs" :key='index'>
				{{ soft }}
			</option>
		</select>
	  </div>
      <p>Su pregunta fue: {{ objectText.prompt }}</p>

      <button @click="store.searchWithText(objectText)">Buscar</button>
    </div>
    <div class="container-social__content">
      <p
        class="container-social__content--response"
        v-for="(response, index) in store.responseText"
        :key="index"
      >
        {{ response }}
      </p>
      <p
        class="container-social__content--loading"
        v-if="store.loading || store.responseText.length >= 0"
      >
        Aqui aparecera tu texto cuando sea generado por incopy
      </p>
    </div>
  </div>
</template>

<style lang='scss'>
@import "./../styles/views/social-media.scss";
</style>