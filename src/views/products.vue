<template>
    <div class="container-products container">
        <h1 class='title-page mb-3'>Comienza ahora</h1>
        <div class="container-cards">
            <router-link class="card" v-for='(product, index) in products' :key='index' :to='product.to'>
                <i :class='`icon-big pi ${product.icon}`'></i>
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
                icon: 'pi-book',
                description: 'Redacta con ayuda de la IA de manera flexible para crear cualquier contenido escrito que necesites',
                to: 'free-style'
            },
            {
                title: 'Redes sociales',
                icon: 'pi-comments',
                description: 'Genere copys efectivos y vendedores para sus redes sociales acompañado de los hashtags que requieras',
                to: 'social-media'
            },
            {
                title: 'Artículos',
                icon: 'pi-comments',
                description: 'Escribe todo un artículo para blog o contenido de tu sitio web con palabras optimizadas para SEO',
                to: ''
            },
            {
                title: 'Emails',
                icon: 'pi-envelope',
                description: 'Crea los textos de mails llamativos para enganchar a tu público en pocos segundos',
                to: ''
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