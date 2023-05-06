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
                soft: "",
                prompt: "",
                context: [""]
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

        async makeSearchIn(mainSeach: string, propmt: string) {

            this.objectToSent.prompt = propmt;
            this.objectToSent.context = storeFreestyle.context;
            makeScroll()
            
            switch (mainSeach) {
                case 'free-style':
                    await storeFreestyle.freeStyle(this.objectToSent)
                    
                    break;
                case 'otro':
                    console.log('no se encontro ninguno 1');
                    break;
                case 'otro2':
                    console.log('no se encontro ninguno 2');
                    break;
                case 'otro3':
                    console.log('no se encontro ninguno 3');
                    break;
                case 'otro4':
                    console.log('no se encontro ninguno 4');
                    break;
                default:
                    console.log('no se encontro ninguno 555 ');
                    break;
            }
        },
        async transcriptAudio(formData: any) {
            axios.post('/transcript-audio', formData)
                .then(async (response) => {
                    await storeFreestyle.freeStyle({
                        prompt: response.data.data,
                        soft: this.objectToSent.soft
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        setSoftResponse (softResponse: string) {
            this.objectToSent.soft = softResponse;
        }
    }
});