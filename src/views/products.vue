<template>
    <div class="container-products container">
        <h1 class='title-page mb-3'>Comienza ahora</h1>
        <p class='description-page'>
            ¡Bienvenidos a nuestra sección de Planillas de Redacción con Inteligencia Artificial! Aquí, encontrarás
            herramientas que te ayudarán a escribir contenido de alta calidad de manera más rápida y eficiente. Ahorra
            tiempo valioso mientras produces contenido para tu sitio web, redes sociales o campañas de marketing con
            nuestras planillas de redacción.
        </p>
        <div class="container-cards">
            <router-link class="card" v-for='(product, index) in products' :key='index' :to='product.to'>
                <img :src="`/images/${product.image}.png`" alt="pencil" class='mr-2'>
                <h2 class='title mt-1'>{{ product.title }}</h2>
                <p class="description mt-3">
                    {{ product.description }}
                </p>
                <img class='mt-2' src="/images/arrow-icon.svg" alt="arrow icon">
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
                title: 'Resumenes',
                image: 'blogging',
                description: 'Genera resumenes, analisis y mucho mas.',
                to: 'resumes'
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

<style lang='scss'>@import '../styles/views/products.scss';</style>