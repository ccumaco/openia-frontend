<script lang='ts'>
import { defineComponent } from "vue";
import { reactive, ref } from "@vue/reactivity";
import { useOpenIaStore } from "../stores/global-store";
import Loader from "../components/Loader.vue";
import { copy, makeScroll, removeTags } from "../utils/index";
import { useToast } from "primevue/usetoast";
export default defineComponent({
  name: 'articles view',
  components: { Loader },
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
      prompt: "",
      language: "Español",
      soft: "Informativo",
      maxLength: 400,
      keyWords: [],
      generateSeoKeyWords: false
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
    const separatorExp = ref(/,| /);

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
      maxLengthRespone,
      separatorExp,
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
        <img src="/images/blogging.png" alt="pencil" class='mr-2'> Crea un artículo para blog
      </h2>
      <p class="container-social__content--description">
        Con esta plantilla crea un artículo para blog optimizado para SEO de manera fácil y rápida, solo escribe tu idea y configura las opciones obtener el texto.
      </p>
      <div class="input mb-4">
        <label for="title">Escribe tu idea</label>
        <textarea
          placeholder="Ej.: Escribe un artículo sobre las 10 mejores habilidades blandas que debe tener un líder"
          v-model="objectText.prompt"
          @keyup.enter="store.makeArticle(objectText)"
          name="title"
          id="title"
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
            >Maximo de palabras {{ objectText.maxLength }} / 1000</label
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
          <label for="soft">Estilo</label>
          <select name="soft" id="soft" @change="softMessage($event)">
            <option :value="soft" v-for="(soft, index) in softs" :key="index">
              {{ soft }}
            </option>
          </select>
        </div>
        <div class="checkbox in-block mt-4">
          <input
            type="checkbox"
            name="generateSeoKeyWords"
            id="generateSeoKeyWords"
            v-model="objectText.generateSeoKeyWords"
          />
            <label class='ml-2' for="generateSeoKeyWords">
                Agregar palabras clave automáticamente optimizadas para SEO
            </label>
        </div>
      <Chips
        :separator="separatorExp"
        class="mt-3 in-block"
        v-model="objectText.keyWords"
        placeholder="Ej.: Perseverancia, ser una persona crítica"
        v-if="!objectText.generateSeoKeyWords"
      >
        <template #chip="slotProps">
          <div>
            <span>#{{ slotProps.value }}</span>
          </div>
        </template>
      </Chips>
      </div>
      <button
        class="btn left"
        :disabled="store.loading"
        @click="store.makeArticle(objectText), makeScroll()"
      >
        Generar textos<i class="pi pi-arrow-right ml-3"></i>
      </button>
    </div>
    <div class="container-social__content">
      <p
        class="container-social__content--response pl-5 pr-5"
        v-if='store.textBlog.length'
        @click="copy(store.textBlog), showSuccess(removeTags(store.textBlog))"
      >
        <span v-html='store.textBlog'></span>

        <i class="pi pi-copy container-social__content--response--copy"></i>
      </p>
      <div
        class="container-social__content--loading"
        :class='store.textBlog.length == 0 && store.loading ? "active" : ""'
        v-if="store.textBlog.length == 0"
      >
        <div v-if="store.loading && store.textBlog.length == 0">
          <p>
            Estamos Generando
          </p>
          <p class="container-social__content--loading--big">
            textos increibles para ti
          </p>

          <Loader/>
          <p>esto puede tardar 30s aproximadamente</p>
        </div>
        <p v-if="store.textBlog.length == 0 && !store.loading">
          Aquí aparecerá tu texto cuando sea generado por Arquitext
        </p>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
@import "./../styles/views/social-media.scss";
</style>