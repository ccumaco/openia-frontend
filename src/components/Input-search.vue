
<script setup>
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useOpenIaStore } from '../stores/global-store';
import { useInputSearch } from '../stores/input-search';
import { useFreeStyleStore } from '../stores/free-style-store';
const storeInput = useInputSearch();
const storeFreeStyle = useFreeStyleStore();

const {
    softs,
    objectToSent,
    setSoftResponse,
    makeSearchIn
} = storeInput
const store = useOpenIaStore();
const { user } = storeToRefs(store);
const { freeStyle } = storeFreeStyle;
let idIntervalo = ref("")
const propmt = ref("")
defineProps({
    mainSearch: {
        type: String,
        require: true
    }
})
const showSoftStyles = ref(false)
const openSoftStyles = () => {
    showSoftStyles.value = !showSoftStyles.value
}

let tiempoInicio = Date.now();
const mediaRecorder = ref(null);
const recording = ref(false);
const duracion = ref("");
const tieneSoporteUserMedia = () => {
    const devices = !!(navigator.mediaDevices.getUserMedia)
    if (typeof MediaRecorder === "undefined" || !devices) {
        alert('no cuentas con un navegador que soporte microfono')
        return false
    }
};

const segundosATiempo = numeroDeSegundos => {
    let horas = Math.floor(numeroDeSegundos / 60 / 60);
    numeroDeSegundos -= horas * 60 * 60;
    let minutos = Math.floor(numeroDeSegundos / 60);
    numeroDeSegundos -= minutos * 60;
    numeroDeSegundos = parseInt(numeroDeSegundos);
    if (horas < 10) horas = "0" + horas;
    if (minutos < 10) minutos = "0" + minutos;
    if (numeroDeSegundos < 10) numeroDeSegundos = "0" + numeroDeSegundos;

    return `${horas}:${minutos}:${numeroDeSegundos}`;
};

const comenzarAContar = () => {
    idIntervalo = setInterval(() => {
        duracion.value = segundosATiempo((Date.now() - tiempoInicio) / 1000)
    }, 1000);
};

const detenerConteo = () => {
    recording.value = !recording.value
    tiempoInicio = null;
    duracion.value = "";
    clearInterval(idIntervalo);
}
const comenzarAGrabar = async () => {
    tieneSoporteUserMedia()
    recording.value = !recording.value;
    if (mediaRecorder.value) return alert("Ya se está grabando");
    navigator.mediaDevices.getUserMedia({
        audio: {
            deviceId: listaDeDispositivos.value,
        }
    })
        .then(
            stream => {
                duracion.value = segundosATiempo((Date.now() - tiempoInicio) / 1000);
                mediaRecorder.value = new MediaRecorder(stream);
                mediaRecorder.value.start();
                comenzarAContar();
                const fragmentosDeAudio = [];
                mediaRecorder.value.addEventListener("dataavailable", evento => {
                    fragmentosDeAudio.push(evento.data);
                    console.log(fragmentosDeAudio);
                });
                mediaRecorder.value.addEventListener("stop", async () => {
                    const blobAudio = new Blob(fragmentosDeAudio);
                    console.log(blobAudio, "blobAudioblobAudioblobAudio");
                    const formData = new FormData();
                    formData.append("file", blobAudio, `grabacion-${new Date().getTime()}.mp3`);
                    stream.getTracks().forEach(track => track.stop());
                    detenerConteo();
                    axios.post('/transcript-audio', formData)
                        .then(async (response) => {
                            await freeStyle({
                                prompt: response.data.data,
                                soft: objectToSent.soft,
                                context: objectToSent.context
                            })
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            }
        )
        .catch(error => {
            // Aquí maneja el error, tal vez no dieron permiso
            console.log(error)
        });
};
const detenerGrabacion = () => {
    if (!mediaRecorder.value) {
        return alert('No se está grabando');
    }
    mediaRecorder.value.stop();
    mediaRecorder.value = null;
};
</script>

<template>
    <div class='input-component'>
        <div class="container-icon" @click='openSoftStyles'>
            <img src="/images/pensil.svg" alt="icon-style" width='26'>
            <p>Estilo</p>
            <div class="styles-reponse" :class='showSoftStyles ? "show" : ""'>
                <p>Estilo de respuesta</p>
                <div class="styles-reponse--types">
                    <div v-for='(style, index) of softs' class='styles-reponse--types--item'
                        :class='objectToSent.soft == style ? "active" : ""' @click='setSoftResponse(style)'>
                        {{ style }}
                    </div>
                </div>
            </div>
        </div>
        <div class="container-input">
            <input type="text" name="search" id="search" placeholder='Haz tu pregunta o petición de busqueda'
                v-model='propmt' @keyup.enter='makeSearchIn(mainSearch, propmt)'>
            <img src="/images/lupe.png" @click='comenzarAGrabar()' alt="asdasd" width='46' v-show='!recording'
                class='icon-recording' id='btnComenzarGrabacion'>
            <div v-show='recording' @click='detenerGrabacion' id='btnDetenerGrabacion'> Preciona aqui para detener grabacion</div>
            <!-- <span class="loader" v-show='recording' @click='detenerGrabacion' id='btnDetenerGrabacion'></span> -->
        </div>

        <!-- decomment when you need choose the microphone -->
        <select name="listaDeDispositivos" id="listaDeDispositivos" hidden></select>
    </div>
</template>


<style lang="scss" scoped>
.input-component {
    display: flex;

    .container-icon {
        display: flex;
        width: 40px;
        padding: 10px;
        border-radius: 20px;
        background-color: #fff;
        height: 40px;
        margin-right: 20px;
        transition: all .3s linear;
        cursor: pointer;
        position: relative;

        &>p {
            margin-left: 10px;
            opacity: 0;
        }

        &:hover {
            width: 90px;

            p {
                opacity: 1;
            }
        }
    }

    .styles-reponse {
        position: absolute;
        top: -80px;
        background-color: #fff;
        padding: 3px;
        border-radius: 4px;
        left: 0;
        opacity: 0;
        transition: all .3s linear;

        &.show {
            opacity: 1;
        }

        &--types {
            display: flex;
            background-color: #F3F3F3;
            border-radius: 4px;

            &--item {
                padding: 9px 27px;
                border-radius: 4px;
                transition: all .2s linear;

                &.active,
                &:hover {
                    border-radius: 4px;
                    background-color: #02C8B4;
                    color: #fff;
                }
            }
        }

        p {
            text-align: center;
            padding: 5px 0;
        }
    }

    .container-input {
        position: relative;
        width: 100%;

        input {
            width: 100%;
            height: 100%;
            box-shadow: 0px 3px 6px #00000029;
            border-radius: 64px;
            padding: 0 20px;
            border: 0;
        }

        .icon-recording {
            position: absolute;
            right: 10px;
            top: 0;
            bottom: 0;
            height: 80%;
            width: fit-content;
            margin: auto;
            cursor: pointer;
        }
    }
}

.loader {
    width: 4px;
    height: 30px;
    border-radius: 4px;
    display: block;
    margin: auto;
    position: relative;
    background: currentColor;
    color: red;
    box-sizing: border-box;
    animation: animloader 0.3s 0.3s linear infinite alternate;
    position: absolute;
    right: 30px;
    top: 0;
    bottom: 0;
    z-index: 1;
    cursor: pointer;

    &::after,
    &::before {
        content: '';
        width: 4px;
        height: 30px;
        border-radius: 4px;
        background: currentColor;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
        box-sizing: border-box;
        animation: animloader 0.3s 0.45s linear infinite alternate;
    }

    &::before {
        left: -10px;
        animation-delay: 0s;
    }
}

@keyframes animloader {
    0% {
        height: 18px
    }
}
</style>