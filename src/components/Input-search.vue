
<script setup>
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useOpenIaStore } from '../stores/global-store';
const store = useOpenIaStore();
const { user } = storeToRefs(store);


let tiempoInicio, mediaRecorder, idIntervalo;
const recording = ref(false);

const startToRecord = () => {
    
    comenzarAGrabar()
}
const tieneSoporteUserMedia = () =>{
    const devices = !!(navigator.mediaDevices.getUserMedia)
    if (typeof MediaRecorder === "undefined" || !devices){
        alert('no cuentas con un navegador que soporte microfono')
        return false
    }
}

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

const duracion = ref("");

const comenzarAGrabar = () => {
    tieneSoporteUserMedia()
    recording.value = !recording.value;
    if (mediaRecorder) return alert("Ya se está grabando");

    navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: listaDeDispositivos.value,
            }
        })
        .then(
            stream => {
                duracion.value =  segundosATiempo((Date.now() - tiempoInicio) / 1000)
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                comenzarAContar();
                const fragmentosDeAudio = [];
                mediaRecorder.addEventListener("dataavailable", evento => {
                    fragmentosDeAudio.push(evento.data);
                    console.log(fragmentosDeAudio);
                });
                mediaRecorder.addEventListener("stop", () => {
                    stream.getTracks().forEach(track => track.stop());
                    detenerConteo();
                    const blobAudio = new Blob(fragmentosDeAudio);
                    console.log(blobAudio);
                    axios.post('/transcript-audio', {
                        name: `grabacion-${new Date().getTime()}.mp3`,
                        blobAudio: blobAudio,
                        userEmail: user.userEmail
                    })
                });
            }
        )
        .catch(error => {
            // Aquí maneja el error, tal vez no dieron permiso
            console.log(error)
        });
};
const detenerConteo = () => {
    recording.value = !recording.value
    tiempoInicio = null;
    duracion.value = "";
}
const detenerGrabacion = () => {
    if (!mediaRecorder) return alert("No se está grabando");
    mediaRecorder.stop();
    mediaRecorder = null;
};
</script>

<template>
    <div class='input-component'>
        {{ user.userEmail }}
        <div class="container-icon">
            <img src="/images/pensil.svg" alt="asdasd" width='26'>
            <p>Estilo</p>
        </div>
        <div class="container-input">
            <input type="text" name="search" id="search" placeholder='Haz tu pregunta o petición de busqueda'>
            <img
                src="/images/lupe.png"
                @click='startToRecord'
                alt="asdasd"
                width='46'
                v-show='!recording'
                class='icon-recording'
                id='btnComenzarGrabacion'
                >
            <span
                class="loader"
                v-show='recording'
                @click='detenerGrabacion'
                id='btnDetenerGrabacion'
                ></span>
        </div>

        <!-- decomment when you need choose the microphone -->
        <select name="listaDeDispositivos" id="listaDeDispositivos" hidden></select>
    <br>
    <div>
        <p>{{ duracion }}</p>
    </div>
    </div>
</template>


<style lang="scss" scoped>
.input-component {
    display: flex;
    .container-input{
        position: relative;
        width: 100%;
        input{
            width: 100%;
            height: 100%;
            box-shadow: 0px 3px 6px #00000029;
            border-radius: 64px;
            padding: 0 20px;
            border: 0;
        }
        .icon-recording{
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
    &::after, &::before {
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
        animation: animloader 0.3s  0.45s  linear infinite alternate;
        }
    &::before {
        left: -10px;
        animation-delay: 0s;
    }
}

@keyframes animloader {
  0%   {
        height: 18px
    }
}
</style>