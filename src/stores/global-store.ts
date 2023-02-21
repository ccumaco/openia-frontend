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
      isAuthenticated: false
    }
  },
  getters: {
    getResponse: (state) => state.responseText,
    getUser: (state) => state.user,
  },
  actions: {
    
    async login (objUser: ObjUser){
      this.loading = true
      try {
        const data = await axios.post(`/login`, objUser);
        if (data.status == 200) {
          objUser.userToken = data.data.userToken
          console.log(data.data.userToken, 'data.data.userToken');
          window.localStorage.setItem('token', "Bearer " + data.data.userToken)
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
          window.localStorage.setItem('token', "Bearer " + data.data.userToken)
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

  }
})

