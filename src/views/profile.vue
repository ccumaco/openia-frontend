<template>
    <div class='profile'>
        <router-link to='/'><i class='pi pi-arrow-left mr-2'></i> Volver</router-link>
        <h2><i class='pi pi-user mr-2'></i> Cuenta</h2>


        <h1>profile</h1>
    </div>
</template>
<script lang='ts'>

import { defineComponent, onMounted } from 'vue';
import { useOpenIaStore } from '../stores/global-store';
export default defineComponent({
  name: 'profile',
  props: {},
  setup() {
    const store = useOpenIaStore();
    onMounted(() => {
        store.validateToken()
    })
  }
})
</script>