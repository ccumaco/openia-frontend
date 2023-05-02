import { defineStore } from "pinia";
import { useFreeStyleStore } from "./free-style-store";
import { makeScroll } from "../utils";
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
                "Creativa",
                "Balanzeada",
                "Precisa",
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
        setSoftResponse (softResponse: string) {
            this.objectToSent.soft = softResponse;
        }
    }
});