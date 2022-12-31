<template>
  <div>
    <nav class="primary-nav">
      <h1>Incopy</h1>
      <p>Menu</p>
    </nav>
  </div>
</template>

<script setup>
</script>

<style lang='scss'>
  @import '../styles/global-styles.scss';
  .primary-nav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:#000000D9;
    position: fixed;
    top: 0;
    padding: 10px 30px;
    z-index: 3;
    @extend .container;
    color: $white;
  }
</style>