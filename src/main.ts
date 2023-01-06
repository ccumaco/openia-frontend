import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(fas)


const pinia = createPinia()

createApp(App).use(router).use(pinia).component('fa', FontAwesomeIcon).mount('#app')
