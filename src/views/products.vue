<template>
    <div class="container-products container">
        <h1 class='title-page mb-3'>Comienza ahora</h1>
        <div class="container-cards">
            <router-link class="card" v-for='(product, index) in products' :key='index' :to='product.to'>
                <img :src="`/images/${product.image}.png`" alt="pencil" class='mr-2'>
                <h2 class='title'>{{ product.title }}</h2>
                <p class="description mt-3">
                    {{ product.description }}
                </p>
                <i class='pi pi-arrow-right mt-3'></i>
            </router-link>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
    name: 'home',
    setup() {
        const products = [
            {
                title: 'Estilo libre',
                image: 'pencil',
                description: 'Redacta con ayuda de la IA de manera flexible para crear cualquier contenido escrito que necesites',
                to: 'free-style'
            },
            {
                title: 'Redes sociales',
                image: 'redes-sociales',
                description: 'Genere copys efectivos y vendedores para sus redes sociales acompañado de los hashtags que requieras',
                to: 'social-media'
            },
            {
                title: 'Artículos',
                image: 'blogging',
                description: 'Escribe todo un artículo para blog o contenido de tu sitio web con palabras optimizadas para SEO',
                to: 'articles'
            },
            {
                title: 'Emails',
                image: 'email',
                description: 'Crea los textos de mails llamativos para enganchar a tu público en pocos segundos',
                to: 'emails'
            }
        ];
        return {
            products,
        }
    },
});
</script>

<style lang='scss'>
@import '../styles/views/products.scss';

</style>