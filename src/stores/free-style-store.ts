import { defineStore } from "pinia";
import { ObjectTextFree } from "./interfases";
import axios from "axios";

export const useFreeStyleStore = defineStore('freeStyle', {
    state: () => {
        return {
            loading: false,
            context: [] as string[],
            errors: [] as any
        };
    },
    actions: {
        async freeStyle( objectTextFree: ObjectTextFree ) {
            this.loading = true
            this.context.push(objectTextFree.prompt)
            try {
              const response = (await axios.post(`/generate-text-free`, objectTextFree)).data;
              this.context.push(response)
            } catch (error) {
                this.errors = []
                this.errors = error;
            }
            this.loading = false
            return
          },
    }
});