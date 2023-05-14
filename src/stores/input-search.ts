import { defineStore } from "pinia";
import { useFreeStyleStore } from "./free-style-store";
import { makeScroll } from "../utils";
import axios from "axios";
import { ObjectTextFree } from "./interfases";
const storeFreestyle = useFreeStyleStore();

export const useInputSearch = defineStore('inputSearch', {
    state: () => {
        return {
            objectToSent:{
                askUser: {
                    role: 'user',
                    content: ''
                },
                context: []
            },
            languages: [
                "Español",
                "Inglés",
                "Francés",
                "Alemán",
                "Chino",
                "Ruso",
                "Portugués",
                "Italiano",
                "Japonés",
                "Javanés",
            ],

            softs: [
                {name: "Creativa", color: "#FFA702"},
                {name: "Balanceada", color: "#0089FF"},
                {name: "Precisa", color: "#02C8B4"}
            ]
        };
    },
    actions: {

        async makeSearchIn(mainSearch: string) {
            switch (mainSearch) {
                case 'free-style':
                    await storeFreestyle.freeStyle(this.objectToSent)
                    this.objectToSent.askUser.content = ''
                    break;
                default: 'free-style'
                    await storeFreestyle.freeStyle(this.objectToSent)
                    break;
            }
        },
        async transcriptAudio(formData: any) {
            axios.post('/transcript-audio', formData)
                .then(async (response) => {
                    await storeFreestyle.freeStyle(this.objectToSent)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        setSoftResponse (softResponse: string) {
            console.log(softResponse, 'softResponse');
            
            // this.objectToSent.soft = softResponse;
        }
    }
});