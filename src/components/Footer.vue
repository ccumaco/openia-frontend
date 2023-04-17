<template>
    <div class="background">
        <div class='container'>
            <div class="container-top">
                <router-link to="/" class="logo">
                    <img src="/images/logo-negro.png" alt="" width='150'>
                </router-link>
                <div class="container-info">
                    <p class='contact '>Contacto</p>
                    <a class='' aria-label="Chat on WhatsApp" href="https://wa.me/+573132777667?text=saludando desde arquitext" target='_blank'> <i class='pi pi-whatsapp mr-1'></i>313 277 7667</a>
                    <a class='' href="mailto:macgraficas1267@gmail.com"><i class='pi pi-envelope mr-1'></i>macgraficas1267@gmail.com</a>
                </div>
            </div>
            <div class="container-bottom text-center">
                © Architext. Todos los derechos reservados
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
        background: #ECF0F2;
    }
    .container{
        &-top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #C7CED4;
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
                color: #707070;
                text-decoration: none;
                padding: 5px 0;
            }
            .contact{
                font-weight: bold;
                padding:10px 0;
            }
        }
        &-bottom{
            padding-top: 10px;
            color: $text;
        }
    }
</style>