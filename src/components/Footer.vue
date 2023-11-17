<template>
    <div class="background">
        <div class='container'>
            <div class="container-top">
                <router-link to="/" class="logo">
                    <!-- <img src="/images/logo-blanco.png" alt="" width='150'> -->
                </router-link>
                <div class="container-info">
                    <p class='contact '>Contacto</p>
                    <a class='' aria-label="Chat on WhatsApp" href="https://wa.me/+573132777667?text=Hola, tengo algunas dudas sobre arquitext" target='_blank'> <i class='pi pi-whatsapp mr-1'></i>313 277 7667</a>
                    <a class='' href="mailto:contacto@arquitext.com.co "><i class='pi pi-envelope mr-1'></i>contacto@arquitext.com.co </a>
                </div>
            </div>
            <div class="container-bottom text-center">
                © 2023 Arquitext. Todos los derechos reservados
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'FooterGloblal',
    setup (){
        return {
            
        }
    }
})

</script>
<style lang='scss' scoped>
@import '../style.scss';
    .background{
        padding: 35px 0 20px;
        background-color: #050D20;
    }
    .container{
        &-top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #133177;
            padding-bottom: 10px;
            @include screen("sm"){
                flex-direction: column;
                justify-content: center;
            }
        }
        &-info{
            text-align: right;
            @include screen("sm"){
                text-align: center;
            }
            a{
                display: block;
                color: #ffffff;
                text-decoration: none;
                padding: 5px 0;
            }
            .contact{
                font-weight: bold;
                padding:10px 0;
                color: $white;
            }
        }
        &-bottom{
            padding-top: 10px;
            color: $white;
        }
    }
</style>