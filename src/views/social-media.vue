<script lang='ts'>
import { defineComponent } from "vue";
import { reactive, ref } from "@vue/reactivity";
import { useOpenIaStore } from "../stores/global-store";
import Loader from "../components/Loader.vue";
import { copy, makeScroll, removeTags } from "../utils/index";
import { useToast } from "primevue/usetoast";
export default defineComponent({
  name: 'social-media',
  components: { Loader },
  props: {},
  setup(props) {
    const store = useOpenIaStore();
    const toast = useToast();
    const cutText = (text: string) => {
      return text.substring(0, 70) + '...';
    }
    const showSuccess = (textCliped: string) => {
      toast.add({severity:'success', summary: 'Texto copiado', detail: cutText(textCliped), life: 150000});
    }
    const objectText = reactive({
      prompt: "",
      maxLength: 400,
      top_p: 1,
      language: "Español",
      soft: "Persuasivo",
      hashtag: [],
      maxResponses: 3,
      countHashtag: 1,
      automaticHastag: true,
    });
    const lenguajeResponse = (e: any) => {
      objectText.language = e.target.value;
    };
    const softMessage = (e: any) => {
      objectText.soft = e.target.value;
    };
    const maxLengthRespone = (e: any) => {
      objectText.maxLength = e.target.value;
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
    const separatorExp = ref(/,| /);

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
      maxLengthRespone,
      copy,
      separatorExp,
      showSuccess,
      makeScroll,
      removeTags
    };
  },
});
</script>

<template>
  <Toast />
  <div class="container-social">
    <div class="container-social__content">
      <router-link to='/products' class='arrow-back'>
            <i class='pi pi-arrow-left mr-2 '></i> Volver
        </router-link>
        <h2 class="container-social__content--title mt-3">
        <img src="/images/redes-sociales.png" alt="pencil" class='mr-2'> Crea una publicación para redes sociales
      </h2>
      <p class="container-social__content--description">
        Con esta plantilla crea una publicación de manera fácil y rápida, solo
        escribe tu idea y configura las opciones obtener el texto.
      </p>
      <div class="input mb-4">
        <label for="prompt">Consulta</label>
        <textarea
          placeholder="Haz tu consulta"
          v-model="objectText.prompt"
          @keyup.enter="store.searchWithText(objectText)"
          name="prompt"
          id="prompt"
          cols="30"
          rows="5"
          maxlength="300"
          size="20"
        />
      </div>
      <div class="container-social__content__flex">
        <div class="select">
          <label for="language">Idioma de salida</label>
          <select
            name="language"
            id="language"
            @change="lenguajeResponse($event)"
          >
            <option
              :value="language"
              v-for="(language, index) in languages"
              :key="index"
            >
              {{ language }}
            </option>
          </select>
        </div>
        <div class="range">
          <label for="range"
            >Maximo de caracteres {{ objectText.maxLength }} / 1000</label
          >
          <input
            type="range"
            name="maxLength"
            step="50"
            id="maxLength"
            min="100"
            max="1000"
            v-model="objectText.maxLength"
            @input="maxLengthRespone($event)"
            @change="maxLengthRespone($event)"
          />
        </div>
        <div class="select mt-3">
          <label for="soft">Tono del mensaje</label>
          <select name="soft" id="soft" @change="softMessage($event)">
            <option :value="soft" v-for="(soft, index) in softs" :key="index">
              {{ soft }}
            </option>
          </select>
        </div>
        <div class="input mt-3">
          <label class="outside" for="maxResponses">Propuestas de texto</label>
          <input
            placeholder="1"
            v-model="objectText.maxResponses"
            name="maxResponses"
            id="maxResponses"
            type="number"
            min="1"
            max="3"
          />
        </div>
      </div>

      <div class="container-social__content__flex mt-3">
        <div class="checkbox">
          <input
            type="checkbox"
            name="automaticHastag"
            id="automaticHastag"
            v-model="objectText.automaticHastag"
          />
          <label class='ml-2' for="automaticHastag"
            >Agregar hashtags automáticamente optimizados para SEO</label
          >
        </div>
        <div class="input mb-4">
          <label class="outside" for="countHashtag">Cantidad de Hashtags</label>
          <input
            placeholder="1"
            v-model="objectText.countHashtag"
            name="countHashtag"
            id="countHashtag"
            type="number"
            min="1"
            max="10"
          />
        </div>
      </div>
      <Chips
        :separator="separatorExp"
        class="mt-3"
        v-model="objectText.hashtag"
        placeholder="Ej.:#Electrodomesticos, #ArticulosDeAseo"
        v-if="!objectText.automaticHastag"
      >
        <template #chip="slotProps">
          <div>
            <span>#{{ slotProps.value }}</span>
          </div>
        </template>
      </Chips>
      <button
        class="btn left"
        :disabled="store.loading"
        @click="store.searchWithText(objectText), makeScroll()"
      >
        Generar textos<i class="pi pi-arrow-right ml-3"></i>
      </button>
    </div>
    <div class="container-social__content">
      <p
        class="container-social__content--response pl-5 pr-5"
        v-for="(response, index) in store.responseText"
        :key="index"
        @click="copy(response), showSuccess(removeTags(response))"
      >
      <span v-html='response'></span>

        <i class="pi pi-copy container-social__content--response--copy"></i>
      </p>
      <div
        class="container-social__content--loading"
        :class='store.responseText.length == 0 && store.loading ? "active" : ""'
        v-if="store.responseText.length == 0"
      >
        <div v-if="store.loading && store.responseText.length == 0">
          <p>
            Estamos Generando
          </p>
          <p class="container-social__content--loading--big">
            textos increibles para ti
          </p>

          <Loader/>
          <p>esto puede tardar 30s aproximadamente</p>
        </div>
        <p v-if="store.responseText.length == 0 && !store.loading">
          Aquí aparecerá tu texto cuando sea generado por Arquitext
        </p>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
@import "./../styles/views/social-media.scss";
</style>