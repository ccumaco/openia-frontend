import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'
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
      user: {}
    }
  },
  getters: {
    getResponse: (state) => state.responseText,
  },
  actions: {
    async searchWithText( objectText: ObjectText ) {
      this.responseText = [];
      this.loading = true
      try {
        const data = await axios.post(`${this.apiURL}/generateText`, objectText);
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
        const data = await axios.post(`${this.apiURL}/login`, objUser);
        objUser.userToken = data.data.userToken
        window.localStorage.setItem('user', JSON.stringify(objUser))
        this.user = data.data
        router.push("/social-media")
      } catch (error) {
        console.error(error);
      }
      this.loading = false
    },
    async register (objUser: ObjUser){
      this.loading = true
      try {
        const data = await axios.post(`${this.apiURL}/register`, objUser);
        this.user = data.data
        router.push('/login')
      } catch (error) {
        router.push('/register')
        console.error(error);
      }
      this.loading = false
      return
    }
  }
})

