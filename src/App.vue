<script lang="ts">
import { defineComponent} from 'vue';
import Toolbar from './components/Toolbar.vue'
export default defineComponent({
 components:{
  Toolbar
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
</template>

<style lang='scss'>
@import './styles/global-styles.scss';
</style>