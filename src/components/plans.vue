<template>
  <h1>
    Convierte visitas en clientes fieles con una plataforma de alto rendimiento
  </h1>
  <div class="flex">
    <img src="./../assets/speed.png" alt="" />
    <p>
      10X más rápido
      <span>en creación de contenido</span>
    </p>
  </div>
  <div class="card">
    <h2>Planes</h2>
    <p>
      Perfecto para cualquier persona y empresas que manejen textos cortos como
      redes sociales, mails, introducciones sencillas, descripciones, anuncios.
    </p>
    <p>$60.000/mes</p>
    <div class="range">
      <label for="range">Maximo de caracteres 100 / 1000</label>
      <input
        type="range"
        name="maxLength"
        step="50"
        id="maxLength"
        min="100"
        max="1000"
      />
    </div>
  </div>
  <Button label='Adquirir ahora'/>
  <ul>
    <li>+26 idiomas de trabajo</li>
    <li>Diversas plantillas</li>
    <li>Optimización SEO</li>
    <li>Lista de consejos para textos</li>
    <li>Historial de textos</li>
    <li>Soporte por whatsapp o mail</li>
  </ul>
</template>

<script lang='ts'>
</script>

<style scoped>
span {
  display: block;
}
</style>