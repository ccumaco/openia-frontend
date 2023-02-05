<template>
    <div class='payments'>
        <div  class="grey-background">
            <div class="container-info">
                <h3 class='title-select'>Selecciona tu plan</h3>
                <div class="btn-container flex justify-content-center mt-4">
                    <label class="switch btn-color-mode-switch">
                        <input v-model='isPerYear' type="checkbox" name="color_mode" id="color_mode" value="1">
                        <label for="color_mode" data-on="Mensual" data-off="Anual (Ahorra 25%)" class="btn-color-mode-switch-inner"></label>
                    </label>
                </div>
                <div v-if='!isPerYear' class="card-plan">
                    <h2>Plan</h2>
                    <h3 class='price'>$37.500/mes</h3>
        
                    <p class='context'>Perfecto para cualquier persona y empresas que manejen textos cortos como redes sociales, mails, introducciones sencillas, descripciones, anuncios.</p>
                    <ul>
                        <li>Palabras ilimitadas</li>
                        <li>Diversas plantillas</li>
                        <li>Optimización SEO</li>
                        <li>Lista de consejos para textos</li>
                        <li>+26 idiomas de trabajo</li>
                        <li>Soporte por whatsapp o mail</li>
                    </ul>
                </div>
                <div v-if='isPerYear' class="card-plan">
                    <h2>Plan</h2>
                    <h3 class='price'>$37.500/Año</h3>
        
                    <p class='context'>Perfecto para cualquier persona y empresas que manejen textos cortos como redes sociales, mails, introducciones sencillas, descripciones, anuncios.</p>
                    <ul>
                        <li>Palabras ilimitadas</li>
                        <li>Diversas plantillas</li>
                        <li>Optimización SEO</li>
                        <li>Lista de consejos para textos</li>
                        <li>+26 idiomas de trabajo</li>
                        <li>Soporte por whatsapp o mail</li>
                    </ul>
                </div>
                <div class="flex justify-content-center mt-4">
                    <div class="btn transparent">
                        <i class='pi pi-arrow-left mr-2'></i>
                        volver
                    </div>
                    <a class="btn" @click='store.takeMonth' href='https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848616128e0186203bf13a0897'>Pagar</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>

import { defineComponent, onMounted, ref } from 'vue';
import { useOpenIaStore } from '../stores/global-store';
export default defineComponent({
  name: 'payments',
  props: {},
  setup() {
    const store = useOpenIaStore();
    onMounted(() => {
        store.validateToken()
    })

    const isPerYear = ref(false);

    return {
        isPerYear,
        store
    }
  }
})
</script>
<style lang='scss'>
@import '../styles/global-styles.scss';
.payments{
    min-height: 100vh;
    .title-select{
        text-align: center;
    }
    .grey-background{
        min-width: 50%;
        padding-top: 100px;
        max-width: 700px;
        margin: 0 auto;
        .contianer-btns{
            text-align: center;
            margin-bottom: 20px;
            margin-top: 20px;
        }
        .card-plan{
            background-color: $white;
            max-width: 550px;
            margin: 0 auto;
            border-radius: 10px 10px 80px 80px;
            padding: 50px;
            border: 1px solid $primary-color;
            .price{
                color: $primary-color;
                font-size: 45px;
            }
            .context{
                margin-bottom: 27px;
                margin-top: 45px;
                color: $text;
            }
            ul{
                list-style: '\2713';
                margin-left: 30px;
                li{
                    color: $text;
                    padding-left: 10px;
                    margin-bottom: 19px;
                }
            }
        }
    }
    .black-background{
        max-width: 700px;
        min-width: 50%;
        margin-right: auto;
    }
}
</style>