<template>
  <div>
    <h1 class="hidden">INCOPY</h1>
    <div class="wrapper gift-background">
      <video width="100%" autoplay muted>
        <source src="/src/assets/video-background.mp4" type="video/mp4">
        Your browser does not support HTML video.
    </video>
      <div class="gift__container">
        <h2>Crea tus textos, <span>10X</span> más rápido con IA</h2>
        <p>
          Soluciones de copywriting creativo rápidas y efectivas para impulsar
          tu negocio en línea
        </p>
      </div>
    </div>
    <div class="container">
      <h3>¿Que puedes hacer con incopy?</h3>
      <div class="container-cards">
        <div
          class="container-cards--card"
          v-for="(card, index) in cardsInfo"
          :key="index"
        >
          <img :src="card.image" :alt="card.alt" />
          <div class="container-cards--card--content">
            <h4>{{ card.title }}</h4>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  data() {
    return {
      
    };
  },
  methods: {},
  setup(props) {
    const cardsInfo = [
        {
          image: '/src/assets/speed.png',
          title: "10X más rápido en creación de contenido",
          description:
            "Automatizar el proceso de escritura y analizar grandes cantidades de información de manera más rápida que un humano, lo que te permite ahorrar tiempo y crear contenido de manera más eficiente.",
          alt: "image lorem",
        },
        {
          image: '/src/assets/world.png',
          title: "hasta 26 idiomas diferentes",
          description:
            "Es capaz de traducir hasta 26 idiomas diferentes, permitiéndole llegar a un público más amplio y global. Esto puede ser especialmente útil si tienes un sitio web o negocio en línea y quieres expandirte a nuevos mercados.",
          alt: "image lorem",
        },
        {
          image: '/src/assets/inovation.png',
          title: "Ideas nuevas y originales",
          description:
            "Nuestra IA genera ideas nuevas y originales para mantener tu contenido fresco y atractivo para tus visitantes. Esto puede ayudar a aumentar el engagement y la fidelidad de tus clientes.",
          alt: "image lorem",
        },
        {
          image: '/src/assets/lupe.png',
          title: "Contenido optimizado para SEO",
          description:
            "Analiza y optimiza el contenido para mejorar su posicionamiento en los motores de búsqueda. Esto puede ayudar a atraer más tráfico a tu sitio y mejorar su visibilidad en línea.",
          alt: "image lorem",
        },
        {
          image: '/src/assets/group.png',
          title: "Flexibilidad con tus audiencias",
          description:
            "Con nuevo contenido puede adaptar tus textos a diferentes audiencias y formatos para que puedas llegar a más personas de manera más efectiva.",
          alt: "image lorem",
        },
        {
          image: '/src/assets/pensil.png',
          title: "Precisión en tus Textos",
          description:
            "Gracias a la IA, puede detectar y corregir errores gramaticales y de ortografía para mejorar la precisión de tus textos.",
          alt: "image lorem",
        },
      ];
      
      return {
        cardsInfo
      }
  },
});
</script>

<style lang='scss'>
@import "./../styles/views/home.scss";
</style>