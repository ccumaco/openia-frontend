import { defineStore } from "pinia";
import { ObjectTextFree, defineMessage, freeStyleWithContext } from "./interfases";
import axios from "axios";
import { makeScroll } from "../utils";

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
            const oldQuestion = Object.assign({},freeStyleWithContext.askUser)
            this.context.push(oldQuestion)
            freeStyleWithContext.context = this.context;
            console.log(freeStyleWithContext, 'freeStyleWithContext freeStyleWithContext');
            this.loading = true
            axios.post('https://nc-api-test.onrender.com/chat', freeStyleWithContext)
                .then((response) => {
                    this.context.push(response.data[0]);
                }). catch((error) => {
                    console.log(error);
                })
            this.loading = false
        }
    }
});