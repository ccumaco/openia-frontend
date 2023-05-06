
<script setup>
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
    makeSearchIn,
    transcriptAudio
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
        duracion.value = duracion.value + 1
        if (duracion.value >= 60) {
            detenerGrabacion();
            return
        }
    }, 1000);
};

const detenerConteo = () => {
    recording.value = !recording.value
    duracion.value = 0;
    clearInterval(idIntervalo);
}

const detenerGrabacion = () => {
    if (!mediaRecorder.value) {
        return alert('No se está grabando');
    }
    mediaRecorder.value.stop();
    mediaRecorder.value = null;
};
const comenzarAGrabar = async () => {
    tieneSoporteUserMedia()
    recording.value = !recording.value;
    if (mediaRecorder.value) return alert("Ya se está grabando");
    navigator.mediaDevices.getUserMedia({
        audio: {
            deviceId: listaDeDispositivos.value,
        }
    })
        .then(stream => {
                duracion.value = 0;
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
                    transcriptAudio(formData);
                });
            }
        )
        .catch(error => {
            // Aquí maneja el error, tal vez no dieron permiso
            console.log(error)
        });
};

</script>

<template>
    <div class='input-component'>
        <div class="container-icon" @click='openSoftStyles'>
            <img src="/images/before-record.svg" alt="icon-style" width='26'>
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
            
            <textarea autofocus
                type="text"
                name="search"
                id="search"
                placeholder='Pregunta o busca lo que quieras'
                v-model='propmt'
                @keyup.enter='makeSearchIn(mainSearch, propmt), propmt = ""'
                :rows='propmt.length > 300 ? "3" : (propmt.length > 150 ? "2" : "1")'
                
            />
            <span class="tooltip" data-tooltip="Habla y escribiremos por ti">
            <span class="tooltip-info">some more information </span>
                <img
                    src="/images/icon-recording.svg"
                    @click='comenzarAGrabar()'
                    alt="start to record"
                    width='46'
                    v-show='!recording'
                    class='icon-recording'
                    id='btnComenzarGrabacion'
                >
            </span>
            <div class="recording-buscador" v-show='recording'>
                <div class="recording-animation">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                <p>¡Habla ahora!</p>
                <span class="tooltip" data-tooltip="Detener la grabación">
                <span class="tooltip-info">some more information </span>
                    <img
                        src="/images/icon-voice.svg"
                        @click='detenerGrabacion'
                        alt="stop recording"
                        width='46'
                        class='icon-recording stop'
                        id='btnComenzarGrabacion'
                    >
                </span>
            </div>
            
        </div>

        <!-- decomment when you need choose the microphone -->
        <select name="listaDeDispositivos" id="listaDeDispositivos" hidden></select>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/global-styles.scss';
.stop{
    border: 1px solid red;
}
.recording-animation {
  position: absolute;
  right: 160px;
  top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
}

.dot {
  width: 4px;
  height: 20px;
  border-radius: 5px;
  margin-right: 6px;
  background-color: #5c5c5c;
  opacity: 0.4;
  animation: recording 1s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

.dot:nth-child(4) {
  animation-delay: 0.6s;
}

@keyframes recording {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
}

.recording-buscador{
    p{
        position: absolute;
        right: 62px;
        top: 16px;
    }
}
.input-component {
    display: flex;
    min-height: 1rem;
    max-height: 3rem;

    .container-icon {
        display: flex;
        width: 52px;
        padding: 10px 8px 10px 13px;
        border-radius: 26px;
        background-color: $white;
        height: 52px;
        margin-right: 20px;
        transition: all .1s linear;
        cursor: pointer;
        position: relative;
        -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1607843137);
        -moz-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1607843137);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1607843137);
        @include screen("sm"){
		    display: none;
	    }

        &>p {
            margin-left: 10px;
            opacity: 0;
            color: $primary-color;
            font-size: 1.12em;
            padding-top: 3.2px;
            padding-left: 3px;
        }

        &:hover {
            width: 120px;

            p {
                opacity: 1;
            }
        }
    }

    .styles-reponse {
        position: absolute;
        top: -80px;
        background-color: $white;
        padding: 3px;
        border-radius: 4px;
        left: 0;
        opacity: 0;
        transition: all .3s linear;
        z-index: -99;
        &.show {
            opacity: 1;
            z-index: 1;
        }

        &--types {
            display: flex;
            background-color: $hover;
            border-radius: 4px;
            color: black;

            &--item {
                padding: 9px 27px;
                border-radius: 4px;
                color: black;
                background-color: $hover;
                transition: all 0.3s linear;
               
                &.active{
                    &:nth-child(1){
                        background-color: #FFA702;
                        color: $white;
                    }
                    &:nth-child(2){
                        background-color: #0089FF;
                        color: $white;
                    }
                    &:nth-child(3){
                        background-color: #02C8B4;
                        color: $white;
                    }
                }
                &:hover{
                    background-color: #cecdda;
                }
            }
        }

        p {
            text-align: center;
            padding: 5px 0;
            color: $primary-color;
        }
    }

    .container-input {
        position: relative;
        width: 100%;

        textarea,input {
            min-width: 100%;
            width: 100%;
            min-height: 50px;
            max-height: 120px;
            transition: max-height 0.3s ease-out;
            box-shadow: 0px 3px 6px #00000029;
            border-radius: 26px;
            padding: 10px 50px 0 20px;
            border: 0;
            color: #818da1;
            padding-top: calc((50px - 1.2em) / 2); 
            padding-bottom: calc((50px - 1.2em) / 2);
            font-size: 1em;
            resize: none;
            &:focus-visible{
                outline: 1px solid #818da1;
            }
        }

        .icon-recording {
            position: absolute;
            right: 5px;
            top: 5px;
            bottom: 0;
            height: 100%;
            margin: auto;
            cursor: pointer;
        }
    }
}

.tooltip img{
    background-color: $white;
    padding: 10px;
    border-radius: 50%;
    transition: transform 0.2s ease, background-color 0.2s ease;
}
.tooltip img:hover{
    background-color: $hover;
    transform: scale(1);
}
.tooltip-info {
  position: absolute;
  top: -9999px;
  left: -9999px;
}
span.tooltip::before {
  content: attr(data-tooltip);
  position: absolute;
  top: -2.5em;
  right: 0.5em;
  font-size: 0.9em;
  padding: 5px 10px;
  display: none;
  color: white;
  background: rgba(23, 22, 26, 0.75);
  border-radius: 4px;
  transition: opacity 0.1s ease-out;
  z-index: 99;
  text-align: left;
}

span:hover::before {
  display: inline-block;
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