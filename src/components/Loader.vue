<template>
  <div class='content-loader'>
    <span class="loader"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
export default defineComponent({
  name: 'loader',
  setup(props) {
  },
})
</script>

<style lang='scss' scoped>
@import '../styles/global-styles.scss';
.content-loader{
  min-height: 70px;
  width: fit-content;
  margin: 20px auto;
  padding: 0 50px 0 0;
  text-align: center;
  .loader {
      animation: rotate 1s infinite;
      height: 50px;
      width: 50px;
      min-height: 100px;
      &::before,&::after{
        border-radius: 50%;
        content: "";
        display: block;
        height: 20px;
        width: 20px;
      }
      &::before{
        animation: ball1 1s infinite;
        background-color: #82c5ff;
        box-shadow: 30px 0 0 $primary-color;
        margin-bottom: 10px;
      }
      &::after{
        animation: ball2 1s infinite;
        background-color: $primary-color;
        box-shadow: 30px 0 0 #82c5ff;
      }
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
      box-shadow: 30px 0 0 #82c5ff;
    }
    50% {
      box-shadow: 0 0 0 #82c5ff;
      margin-top: -20px;
      transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 #82c5ff;
      margin-top:0;}}
</style>