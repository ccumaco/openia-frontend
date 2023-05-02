<script setup lang="ts">
import { defineComponent} from 'vue';
import Toolbar from './components/Toolbar.vue'
import FooterGloblal from './components/Footer.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const router = useRoute();
  const loggedIn = ref(false)
  
    const checkLogin = () => {
      // Verificar si el usuario está conectado
      if (localStorage.getItem('user')) {
        loggedIn.value = true
      } else {
        loggedIn.value = false
      }
    }
</script>

<template>
  <Toolbar />
  <router-view></router-view>
  <FooterGloblal v-if='router.path !== "/free-style"' />
</template>

<style lang='scss'>
@import './styles/global-styles.scss';
</style>