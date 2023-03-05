<template>
    <div class='container-404'>
        <h1 class='title'>¡Lo sentimos!</h1>
        <p class='description'>La página que buscas no se encuentra disponible en este momento</p>
        <p class='description'>Por favor, revisa la dirección que ingresaste o utiliza la barra de búsqueda para encontrar lo que estás buscando. También puedes navegar por nuestro sitio web para encontrar contenido relevante.</p>
        <router-link to='/' class='btn'>Volver al inicio</router-link>
    </div>
</template>

<script lang='ts'>
export default {

}
</script>

<style lang='scss' scoped>
@import '../style.scss';
.container-404{
    height: 80vh;
    background: blue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title{
        color: $white;
        text-align: center;
    }
    .description{
        text-align: center;
        max-width: 830px;
        margin: 0 auto;
        color: $white;
    }
}
</style>