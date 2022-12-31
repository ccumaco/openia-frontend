import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

interface ObjectText {
  prompt: String,
  maxLength: number,
  top_p: number
}
// interface UserInfo {
//   name: string
//   age: number
// }

export const useOpenIaStore = defineStore('apiOpenIA', {
  state: () => {
    return {
      apiURL: 'http://localhost:5000/openai',
      responseText: [] as string[],
      loading: false
    }
  },
  getters: {
    getResponse: (state) => state.responseText,
  },
  actions: {
    async searchWithText( objectText: ObjectText ) {
      this.loading = true
      try {
        const data = await axios.post(`${this.apiURL}/generateText`, objectText);
        this.responseText.push(data.data)
        console.log(objectText);
        
      } catch (error) {
        console.error(error);
      }
      this.loading = false
    },
  }
})

