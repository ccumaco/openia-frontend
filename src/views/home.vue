<template>
  <div>
    <h1 class="hidden">Arquitext</h1>
    <div class="wrapper gift-background">
      <div class="cont-banner">
       <video width="100%" autoplay muted loop>
          <source src="/images/video-background.mp4" type="video/mp4">
          Your browser does not support HTML video.
        </video>
        <div class="--sombra"></div>
        <div class="--gradado-inferior"></div>
      </div>
      <div class="gift__container">
        <h2>Crea tus textos, <span>10X</span><br/>más rápido con IA</h2>
        <p>
          Soluciones de copywriting creativo rápidas y efectivas <br/>para impulsar
          tu negocio en línea
        </p>
      </div>
      <router-link to='/register' class='btn btn-home'>Comienza gratis ahora</router-link>
    </div>
    <div class='background-blue'>
      <div class="container-white container">
        <h3>¿Qué puedes hacer con Arquitext?</h3>
        <div class="container-cards">
          <div class="container-cards--card" v-for="(card, index) in cardsInfo" :key="index">
            <div class="container-cards--card--content">
              <img :src="`/images/${card.image}`" :alt="card.alt" />
              <h4>{{ card.title }}</h4>
              <p>{{ card.description }}</p>
            </div>
          </div>
        </div>
          <div v-if='false' class="btn-container flex justify-content-center mt-4">
            <label class="switch btn-color-mode-switch">
              <input
                v-model="isPerYear"
                type="checkbox"
                name="color_mode"
                id="color_mode"
                value="1"
              />
              <label
                for="color_mode"
                data-on="Mensual"
                data-off="Anual (Ahorra 25%)"
                class="btn-color-mode-switch-inner"
              ></label>
            </label>
          </div>
          <div v-if="false" class="card-plan">
            <h2>Plan</h2>
            <h3 class="price">$37.500/mes</h3>

            <p class="context">
              Perfecto para cualquier persona y empresas que manejen textos cortos
              como redes sociales, mails, introducciones sencillas, descripciones,
              anuncios.
            </p>
            <ul>
              <li>Palabras ilimitadas</li>
              <li>Diversas plantillas</li>
              <li>Optimización SEO</li>
              <li>Lista de consejos para textos</li>
              <li>+26 idiomas de trabajo</li>
              <li>Soporte por whatsapp o mail</li>
            </ul>
          </div>
          <div v-if="false" class="card-plan">
            <h2>Plan</h2>
            <h3 class="price">$37.500/Año</h3>

            <p class="context">
              Perfecto para cualquier persona y empresas que manejen textos cortos
              como redes sociales, mails, introducciones sencillas, descripciones,
              anuncios.
            </p>
            <ul>
              <li>Palabras ilimitadas</li>
              <li>Diversas plantillas</li>
              <li>Optimización SEO</li>
              <li>Lista de consejos para textos</li>
              <li>+26 idiomas de trabajo</li>
              <li>Soporte por whatsapp o mail</li>
            </ul>
          </div>
          <div class="btn-final">
            <router-link to='/register' class='btn btn-home'>Comienza gratis ahora</router-link>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: 'home',
  components: {},
  methods: {},
  setup (props) {
    const isPerYear = ref(true)
    const cardsInfo = [
      {
        image: 'speed.png',
        title: "10X más rápido en creación de contenido",
        description:
          "Automatizar el proceso de escritura y analizar grandes cantidades de información de manera más rápida que un humano, lo que te permite ahorrar tiempo y crear contenido de manera más eficiente.",
        alt: "image lorem",
      },
      {
        image: 'world.png',
        title: "hasta 26 idiomas diferentes",
        description:
          "Es capaz de traducir hasta 26 idiomas diferentes, permitiéndole llegar a un público más amplio y global. Esto puede ser especialmente útil si tienes un sitio web o negocio en línea y quieres expandirte a nuevos mercados.",
        alt: "image lorem",
      },
      {
        image: 'inovation.png',
        title: "Ideas nuevas y originales",
        description:
          "Nuestra IA genera ideas nuevas y originales para mantener tu contenido fresco y atractivo para tus visitantes. Esto puede ayudar a aumentar el engagement y la fidelidad de tus clientes.",
        alt: "image lorem",
      },
      {
        image: 'lupe.png',
        title: "Contenido optimizado para SEO",
        description:
          "Analiza y optimiza el contenido para mejorar su posicionamiento en los motores de búsqueda. Esto puede ayudar a atraer más tráfico a tu sitio y mejorar su visibilidad en línea.",
        alt: "image lorem",
      },
      {
        image: 'group.png',
        title: "Flexibilidad con tus audiencias",
        description:
          "Con nuevo contenido puede adaptar tus textos a diferentes audiencias y formatos para que puedas llegar a más personas de manera más efectiva.",
        alt: "image lorem",
      },
      {
        image: 'pensil.png',
        title: "Precisión en tus Textos",
        description:
          "Gracias a la IA, puede detectar y corregir errores gramaticales y de ortografía para mejorar la precisión de tus textos.",
        alt: "image lorem",
      },
    ];
    const display = ref(true)
    const selectedCity = null
    const cities = [
      { name: 'Menual' },
      { name: 'Anual (Ahhorra 25%)' }
    ]
    const modal = ref(false)
    const showModal = () => {
      modal.value = !modal.value
    }
    return {
      cardsInfo,
      display,
      cities,
      selectedCity,
      showModal,
      modal,
      isPerYear
    }
  },
});
</script>


<style lang='scss' scoped>
@import "./../styles/views/home.scss";
</style>