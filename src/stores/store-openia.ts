import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import { capitalize } from '../utils/index'
import { ObjUser, ObjectTextSocial, ObjectTextFree, MakeArticle, GenerateEmail } from './interfases'

export const useOpenIaStore = defineStore('apiOpenIA', {
  state: () => {
    return {
      apiURL: import.meta.env.VITE_NODE_ENV === 'dev' ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD,
      responseText: [] as string[],
      loading: false,
      textFreeStyle: '',
      textBlog: '',
      textEmail: '',
    }
  },
  getters: {
    getResponse: (state) => state.responseText,
  },
  actions: {
    async searchWithText( objectTextSocial: ObjectTextSocial ) {
      this.responseText = [];
      this.loading = true
      try {
        const data = await axios.post(`/generate-text-social`, objectTextSocial);
        this.responseText = data.data
      } catch (error) {
        console.error(error);
      }
      this.loading = false
      return
    },
    async takeYearPlan () {
      await axios.post('/create-plan')
      .then(response => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      })
    },
    async takeMonth () {
      await axios.post('/save-transaction')
      .then(response => {
        console.log(response);
        window.location.href = 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848616128e0186203bf13a0897'
      })
      .catch((e) => {
        console.log(e);
        window.location.href = 'https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c9380848616128e0186203bf13a0897'
      })
    },
    async freeStyle( objectTextFree: ObjectTextFree ) {
      this.textFreeStyle = '';
      this.loading = true
      try {
        const data = await axios.post(`/generate-text-free`, objectTextFree);
        console.log(data);
        
        this.textFreeStyle = data.data
      } catch (error) {
        console.error(error);
      }
      this.loading = false
      return
    },
    async generateEmail( objectEmail: GenerateEmail ) {
      this.textEmail = '';
      this.loading = true
      try {
        const data = await axios.post(`/generate-email`, objectEmail);
        console.log(data);
        
        this.textEmail = data.data
      } catch (error) {
        console.error(error);
      }
      this.loading = false
      return
    },
    async makeArticle( objectTextSocial: MakeArticle ) {
      this.textBlog = '';
      this.loading = true
      try {
        const data = await axios.post('/generate-article', objectTextSocial);
        this.textBlog = data.data
      } catch (error) {
        console.error(error);
      }
      this.loading = false
      return
    }
  }
})

