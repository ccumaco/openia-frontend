import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// prime vue
import PrimeVue from 'primevue/config';
// css prime vue 
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'

// Componentes prime vue
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';

/* add icons to the library */
library.add(fas)


const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(PrimeVue)
    .use(ToastService)
    .component('fa', FontAwesomeIcon)
    .component('Dialog', Dialog)
    .component('InputText', InputText)
    .mount('#app')
