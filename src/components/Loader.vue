<template>
  <span class="loader"></span>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
export default defineComponent({
  setup(props) {
  },
})
</script>

<style lang='scss' scoped>
@import '../styles/global-styles.scss';
.loader {
    animation: rotate 1s infinite;
    height: 50px;
    width: 50px;
    &::before,&::after{
      border-radius: 50%;
      content: "";
      display: block;
      height: 20px;
      width: 20px;
    }
    &::before{
      animation: ball1 1s infinite;
      background-color: #fff;
      box-shadow: 30px 0 0 $primary-color;
      margin-bottom: 10px;
    }
    &::after{
      animation: ball2 1s infinite;
      background-color: $primary-color;
      box-shadow: 30px 0 0 #fff;
    }
  }

  @keyframes rotate {
    0% { transform: rotate(0deg) scale(0.8) }
    50% { transform: rotate(360deg) scale(1.2) }
    100% { transform: rotate(720deg) scale(0.8) }
  }

  @keyframes ball1 {
    0% {
      box-shadow: 30px 0 0 $primary-color;
    }
    50% {
      box-shadow: 0 0 0 $primary-color;
      margin-bottom: 0;
      transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 $primary-color;
      margin-bottom: 10px;
    }
  }

  @keyframes ball2 {
    0% {
      box-shadow: 30px 0 0 #fff;
    }
    50% {
      box-shadow: 0 0 0 #fff;
      margin-top: -20px;
      transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 #fff;
      margin-top:0;}}
</style>