<script lang="ts">
import { defineComponent} from 'vue';
import Toolbar from './components/Toolbar.vue'
import Footer from './components/Footer.vue'
export default defineComponent({
 components:{
  Toolbar,
  Footer
 },
  data(){
    return{
      loggedIn: false
    }
  },
  methods:{
    checkLogin() {
      // Verificar si el usuario está conectado
      if (localStorage.getItem('user')) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    }
  },
  created() {
    this.checkLogin()
  }
})
</script>

<template>
  <Toolbar />
  <router-view></router-view>
  <Footer />
</template>

<style lang='scss'>
@import './styles/global-styles.scss';
</style>