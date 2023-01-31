import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
import { capitalize } from '../utils/index'
interface ObjectText {
  prompt: String,
  maxLength: number,
  top_p: number,
  language: String,
  soft: String,
  hashtag: string[],
  maxResponses: number,
  countHashtag: number,
  automaticHastag: boolean
}

interface ObjUser {
  userName: string,
  userEmail: String,
  userPassword: String,
  userToken?: String
}

export const useOpenIaStore = defineStore('apiOpenIA', {
  state: () => {
    return {
      apiURL: import.meta.env.VITE_NODE_ENV === 'dev' ? import.meta.env.VITE_API_DEV : import.meta.env.VITE_API_PROD,
      responseText: [] as string[],
      loading: false,
      user: {} as ObjUser
    }
  },
  getters: {
    getResponse: (state) => state.responseText,
    getUser: (state) => state.user,
  },
  actions: {
    async searchWithText( objectText: ObjectText ) {
      this.responseText = [];
      this.loading = true
      try {
        const data = await axios.post(`/generateText`, objectText);
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
        objUser.userToken = data.data.userToken
        window.localStorage.setItem('token', JSON.stringify(objUser.userToken))
        capitalize(data.data.userName);
        this.user = data.data
        window.localStorage.setItem('user', JSON.stringify(data.data));
        router.push("/social-media")
        this.loading = false
        return true
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
        objUser.userToken = data.data.userToken
        window.localStorage.setItem('token', JSON.stringify(objUser.userToken))
        capitalize(data.data.userName);
        this.user = data.data
        window.localStorage.setItem('user', JSON.stringify(data.data));
        this.loading = false
        return true
      } catch (error) {
        console.error(error);
        this.loading = false
        return false
      }
    },
    async validateToken () {
      const token = localStorage.getItem('token')?.replace(/['"]+/g, '');
      const user = localStorage.getItem('user');
      let access = false
      await axios.post('/verify-token', { token })
      .then(response => {
        if (response.data.valid == true) {
          this.user = JSON.parse(user!)
          access = true
          console.log('en el true!!!');
          return
        } else {
          access = false
          console.log('en el false!!!');
          return false
        }
      })
      .catch(error => {
        access = false
        console.log('en el cathc!!!', error);
        return false
      });
      console.log(access, 'acesss');
      
      return access
    }
  }
})

