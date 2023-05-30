import { defineStore } from "pinia";
import { ObjectTextFree, defineMessage, freeStyleWithContext } from "./interfases";
import axios from "axios";
import { makeScroll } from "../utils";
import { reactive } from "vue";
import { useOpenIaStore } from "./global-store";


export const useFreeStyleStore = defineStore('freeStyle', {
    state: () => {
        return {
            loading: false,
            context: [] as Array<defineMessage>,
            errors: [] as any
        };
    },
    actions: {
        async freeStyle(freeStyleWithContext: freeStyleWithContext) {
            const oldQuestion = Object.assign({}, freeStyleWithContext.askUser);
            const storeGlobal = useOpenIaStore()
            this.context.push(oldQuestion);
            freeStyleWithContext.context = this.context;
            makeScroll();
            this.loading = true;
            try {
                const response = await fetch(storeGlobal.apiURL + '/generate-text-free', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        askUser: oldQuestion,
                        context: this.context.slice(-4)
                      })
                  });
                         
                const reader = response.body?.getReader()
                const decoder = new TextDecoder()
                const responseObject= reactive({
                    role: 'assistant',
                    content: ''
                }) as defineMessage
                this.context.push(responseObject)
                while (true) {
                    const result = await reader?.read();
                    if (result && !result.done) {
                        const { value } = result;
                        const dataString = decoder.decode(value);
                        responseObject.content += dataString
                        this.loading = false;
                    } else {
                        this.loading = false;
                        break;
                    }
                }
                
            } catch (error) {
                console.log(error, 'error');
                this.loading = false;
            }
            
            }
          
        
    }
});