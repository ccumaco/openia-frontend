<script lang="ts">
import { defineComponent} from 'vue';
import Toolbar from './components/Toolbar.vue'
export default defineComponent({
 components:{
  Toolbar
 },
  data(){
    return{
    }
  },
  methods:{
  },
  setup(props) {
  },
})
</script>

<template>
  <Toolbar />
  <router-view></router-view>
</template>

<style lang='scss'>
@import './styles/global-styles.scss';
</style>