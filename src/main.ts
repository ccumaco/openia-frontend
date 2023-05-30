import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import Tooltip from 'primevue/tooltip';
import App from './App.vue'
import router from './router'
import axios from 'axios'

// vuelidate
import Vuelidate from 'vue-clipboard3'
// prime vue
import PrimeVue from 'primevue/config';
// css prime vue 
import 'primeflex/primeflex.scss';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'

// Componentes prime vue
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';
import Chips from 'primevue/chips';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
//@ts-ignore
import 'highlight.js/styles/monokai.css';
import 'markdown-it-latex/dist/index.css'


// import SelectButton from 'primevue/selectButton';

axios.interceptors.request.use((config: any) => {
    config.baseURL = import.meta.env.VITE_NODE_ENV === 'dev' ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD;
    return config;
  });

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(PrimeVue)
    .use(ToastService)
    .component('Dropdown',Dropdown)
    .component('Checkbox',Checkbox)
    .component('Calendar',Calendar)
    .component('Button', Button)
    .component('Toast', Toast)
    .component('Password', Password)
    .component('Divider', Divider)
    .component('Dialog', Dialog)
    .component('InputText', InputText)
    .component('Chips', Chips)
    .component('Avatar', Avatar)
    .component('Menu', Menu)
    .directive('tooltip', Tooltip)
    .mount('#app')
