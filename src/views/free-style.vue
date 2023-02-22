<script lang='ts'>
import { defineComponent } from "vue";
import { reactive, ref } from "@vue/reactivity";
import { useOpenIaStore } from "../stores/global-store";
import Loader from "../components/Loader.vue";
import { copy, makeScroll, removeTags } from "../utils/index";
import { useToast } from "primevue/usetoast";
export default defineComponent({
  name: 'free style view',
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
      prompt: "haz un post de ropa",
      language: "Español",
      soft: "Persuasivo",
      titlePrompt: 'Resumen'
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
  
  <Toast />
  <div class="container-social">
    <div class="container-social__content">
        <router-link to='/products' class='arrow-back'>
            <i class='pi pi-arrow-left mr-2 '></i> Volver
        </router-link>
      <h2 class="container-social__content--title mt-3">
        <img src="/images/pencil.png" alt="pencil" class='mr-2'> Estilo libre
      </h2>
      <p class="container-social__content--description">
        Redacta con ayuda de la IA de manera flexible para crear cualquier contenido escrito que necesites
      </p>
      <div class="input mb-4">
        <label for="title">¿Qué quieres crear?</label>
        <textarea
          placeholder="Ej. Artículo, correo electrónico, carta, recomendación, resumen"
          v-model="objectText.titlePrompt"
          @keyup.enter="store.freeStyle(objectText)"
          name="title"
          id="title"
          cols="30"
          rows="1"
          maxlength="300"
          size="20"
        />
      </div>
      <div class="input mb-4">
        <label for="prompt">¿Cuáles son los puntos principales del contenido?</label>
        <textarea
          placeholder="Ej.: Redacta una recomendación personal dirigida a XXX empresa con el fin de solicitar un cambio de plan en mi servicio de xxxxx a nombre de xxxxxx..."
          v-model="objectText.prompt"
          @keyup.enter="store.freeStyle(objectText)"
          name="prompt"
          id="prompt"
          cols="30"
          rows="5"
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
        <div class="select mt-3">
          <label for="soft">Estilo</label>
          <select name="soft" id="soft" @change="softMessage($event)">
            <option :value="soft" v-for="(soft, index) in softs" :key="index">
              {{ soft }}
            </option>
          </select>
        </div>
      </div>
      <button
        class="btn left"
        :disabled="store.loading"
        @click="store.freeStyle(objectText), makeScroll()"
      >
        Generar textos<i class="pi pi-arrow-right ml-3"></i>
      </button>
    </div>
    <div class="container-social__content">
      <p
        class="container-social__content--response pl-5 pr-5"
        v-if='store.textFreeStyle.length'
        @click="copy(store.textFreeStyle), showSuccess(removeTags(store.textFreeStyle))"
      >
      <span v-html='store.textFreeStyle'></span>

        <i class="pi pi-copy container-social__content--response--copy"></i>
      </p>
      <div
        class="container-social__content--loading"
        :class='store.textFreeStyle.length == 0 && store.loading ? "active" : ""'
        v-if="store.textFreeStyle.length == 0"
      >
        <div v-if="store.loading && store.textFreeStyle.length == 0">
          <p>
            Estamos Generando
          </p>
          <p class="container-social__content--loading--big">
            textos increibles para ti
          </p>

          <Loader/>
          <p>esto puede tardar 30s aproximadamente</p>
        </div>
        <p v-if="store.textFreeStyle.length == 0 && !store.loading">
          Aquí aparecerá tu texto cuando sea generado por Arquitext
        </p>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
@import "./../styles/views/social-media.scss";
</style>