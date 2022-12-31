<template>
  <div>
    <h1 class="hidden">INCOPY</h1>
    <div class="wrapper gift-background">
      <video width="100%" autoplay muted>
        <source src="./../assets/video-background.mp4" type="video/mp4">
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
          <img src="./../assets/icon-world.png" :alt="card.alt" />
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
          image: "icon-world.png",
          title: "hasta 26 idiomas diferentes",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis earum exercitationem expedita maiores facere! Assumenda magnam, autem dolorem similique minima eum explicabo ratione excepturi? Doloribus veritatis facilis amet vitae provident?",
          alt: "image lorem",
        },
        {
          image: "icon-world.png",
          title: "hasta 26 idiomas diferentes",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis earum exercitationem expedita maiores facere! Assumenda magnam, autem dolorem similique minima eum explicabo ratione excepturi? Doloribus veritatis facilis amet vitae provident?",
          alt: "image lorem",
        },
        {
          image: "icon-world.png",
          title: "hasta 26 idiomas diferentes",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis earum exercitationem expedita maiores facere! Assumenda magnam, autem dolorem similique minima eum explicabo ratione excepturi? Doloribus veritatis facilis amet vitae provident?",
          alt: "image lorem",
        },
        {
          image: "icon-world.png",
          title: "hasta 26 idiomas diferentes",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis earum exercitationem expedita maiores facere! Assumenda magnam, autem dolorem similique minima eum explicabo ratione excepturi? Doloribus veritatis facilis amet vitae provident?",
          alt: "image lorem",
        },
        {
          image: "icon-world.png",
          title: "hasta 26 idiomas diferentes",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis earum exercitationem expedita maiores facere! Assumenda magnam, autem dolorem similique minima eum explicabo ratione excepturi? Doloribus veritatis facilis amet vitae provident?",
          alt: "image lorem",
        },
        {
          image: "icon-world.png",
          title: "hasta 26 idiomas diferentes",
          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis earum exercitationem expedita maiores facere! Assumenda magnam, autem dolorem similique minima eum explicabo ratione excepturi? Doloribus veritatis facilis amet vitae provident?",
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