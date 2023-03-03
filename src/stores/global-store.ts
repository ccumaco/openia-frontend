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
      user: {} as ObjUser,
      textFreeStyle: '',
      textBlog: '',
      textEmail: '',
      emailSent: {
        status: 200,
        message: ''
      },
      tokenEmail: false,
      passwordChanged: false
    }
  },
  getters: {
    getResponse: (state) => state.responseText,
    getUser: (state) => state.user,
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
    async login (objUser: ObjUser){
      this.loading = true
      try {
        const data = await axios.post(`/login`, objUser);
        if (data.status == 200) {
          objUser.userToken = data.data.userToken
          console.log(data.data.userToken, 'data.data.userToken');
          window.localStorage.setItem('token', data.data.userToken)
          capitalize(data.data.userName);
          this.user = data.data
          window.localStorage.setItem('user', JSON.stringify(data.data));
          this.loading = false
          return true
        }
      } catch (error) {
        console.error(error);
        this.loading = false
        return false
      }
    },
    async register (objUser: ObjUser){
      this.loading = true
      try {
        const data = await axios.post(`/register`, objUser);
        if (data.status == 200) {
          objUser.userToken = data.data.userToken
          window.localStorage.setItem('token', data.data.userToken)
          capitalize(data.data.userName);
          this.user = data.data
          window.localStorage.setItem('user', JSON.stringify(data.data));
          this.loading = false
          return true
        }
      } catch (error) {
        console.error(error);
        this.loading = false
        return false
      }
    },
    async validateToken () {
      let access = false
      try {
        let token = localStorage.getItem('token');
        if (token) {
          token = token
        } else {
          return false
        }
        const user = localStorage.getItem('user');
        await axios.post('/verify-token', { token })
        .then(response => {
          if (response.data.valid == true) {
            this.user = JSON.parse(user!)
            access = true
            return
          } else {
            access = false
            return false
          }
        })
        .catch(error => {
          access = false
          return false
        });
      } catch (error) {
        console.log(error, 'error token');
        return false
      }
      return access
    },
    async logout ( ) {
      try {
        this.user = {} as ObjUser;
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('token')
        router.push('/')
      } catch (error) {
        console.log('no hay nadad');
        console.log(error);
        
      }
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
    },
    async forgotPassword ( email: string ) {
      this.loading = true;
      axios
        .post('/recovery-password', {email})
        .then((response)=> {
          this.emailSent = response.data;
          this.emailSent.status = 200;
          this.loading = false
          return
        })
        .catch((e) => {
          this.emailSent = e.response.data;
          this.emailSent.status = 400;
          this.loading = false
          return
        })
    },
    async validateEmailToken (ojbToken: object){
      this.loading = true;
      try {
        const data = await axios.post('/validate-email-token', ojbToken);
        this.tokenEmail = true;
        this.loading = false;
        return this.tokenEmail;
      } catch (error) {
        this.loading = false;
        return this.tokenEmail;
      }
    },
    async asingNewPassword (newPassword: string, repeatPassword: string, token: string){
      try {
        const data = axios.post('/new-password', {newPassword, repeatPassword, token})
        this.passwordChanged = true
        this.loading = false;
        return
      } catch (error) {
        this.passwordChanged = false
        this.loading = false;
        return
      }
    },
  }
})

