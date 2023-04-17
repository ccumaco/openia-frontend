<template>
    <div class='input-component'>
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
                @click='startToRecord'
                id='btnDetenerGrabacion'
                ></span>
        </div>

        <!-- decomment when you need choose the microphone -->
        <select name="listaDeDispositivos" id="listaDeDispositivos" hidden></select>
    <br>
    <div>
        
        <p id="duracion"></p>
    </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';


const recording = ref(false);
const startToRecord = () => {
    recording.value = !recording.value;
}
const init = () => {
        const tieneSoporteUserMedia = () =>
            !!(navigator.mediaDevices.getUserMedia)

        // Si no soporta...
        // Amable aviso para que el mundo comience a usar navegadores decentes ;)
        if (typeof MediaRecorder === "undefined" || !tieneSoporteUserMedia())
            return alert("Tu navegador web no cumple los requisitos; por favor, actualiza a un navegador decente como Firefox o Google Chrome");


        // Declaración de elementos del DOM
        const listaDeDispositivos = document.querySelector("#listaDeDispositivos"),
            duracion = document.querySelector("#duracion"),
            btnComenzarGrabacion = document.querySelector("#btnComenzarGrabacion"),
            btnDetenerGrabacion = document.querySelector("#btnDetenerGrabacion");

        // Algunas funciones útiles
        const limpiarSelect = () => {
            for (let x = listaDeDispositivos.options.length - 1; x >= 0; x--) {
                listaDeDispositivos.options.remove(x);
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
        // Variables "globales"
        let tiempoInicio, mediaRecorder, idIntervalo;
        const refrescar = () => {
                duracion.textContent = segundosATiempo((Date.now() - tiempoInicio) / 1000);
            }
            // Consulta la lista de dispositivos de entrada de audio y llena el select
        const llenarLista = () => {
            navigator
                .mediaDevices
                .enumerateDevices()
                .then(dispositivos => {
                    limpiarSelect();
                    dispositivos.forEach((dispositivo, indice) => {
                        if (dispositivo.kind === "audioinput") {
                            const opcion = document.createElement("option");
                            // Firefox no trae nada con label, que viva la privacidad
                            // y que muera la compatibilidad
                            opcion.text = dispositivo.label || `Dispositivo {indice + 1}`;
                            opcion.value = dispositivo.deviceId;
                            listaDeDispositivos.appendChild(opcion);
                        }
                    })
                })
        };
        // Ayudante para la duración; no ayuda en nada pero muestra algo informativo
        const comenzarAContar = () => {
            tiempoInicio = Date.now();
            idIntervalo = setInterval(refrescar, 500);
        };

        // Comienza a grabar el audio con el dispositivo seleccionado
        const comenzarAGrabar = () => {
            if (!listaDeDispositivos.options.length) return alert("No hay dispositivos");
            // No permitir que se grabe doblemente
            if (mediaRecorder) return alert("Ya se está grabando");

            navigator.mediaDevices.getUserMedia({
                    audio: {
                        deviceId: listaDeDispositivos.value,
                    }
                })
                .then(
                    stream => {
                        // Comenzar a grabar con el stream
                        mediaRecorder = new MediaRecorder(stream);
                        mediaRecorder.start();
                        comenzarAContar();
                        // En el arreglo pondremos los datos que traiga el evento dataavailable
                        const fragmentosDeAudio = [];
                        // Escuchar cuando haya datos disponibles
                        mediaRecorder.addEventListener("dataavailable", evento => {
                            // Y agregarlos a los fragmentos
                            fragmentosDeAudio.push(evento.data);
                        });
                        // Cuando se detenga (haciendo click en el botón) se ejecuta esto
                        mediaRecorder.addEventListener("stop", () => {
                            // Detener el stream
                            stream.getTracks().forEach(track => track.stop());
                            // Detener la cuenta regresiva
                            detenerConteo();
                            // Convertir los fragmentos a un objeto binario
                            const blobAudio = new Blob(fragmentosDeAudio);
                            axios.post('/save-audio', {
                                name: `grabacion-${new Date().getTime()}.mp3`,
                                blobAudio
                            })
                            // esto genera el codigo para descargar el archivo
                            // // Crear una URL o enlace para descargar
                            // const urlParaDescargar = URL.createObjectURL(blobAudio);
                            // // Crear un elemento <a> invisible para descargar el audio
                            // let a = document.createElement("a");
                            // document.body.appendChild(a);
                            // a.style = "display: none";
                            // a.href = urlParaDescargar;
                            // a.download = "audiotest.mp3";
                            // // Hacer click en el enlace
                            // a.click();
                            // // Y remover el objeto
                            // window.URL.revokeObjectURL(urlParaDescargar);
                        });
                    }
                )
                .catch(error => {
                    // Aquí maneja el error, tal vez no dieron permiso
                    console.log(error)
                });
        };


        const detenerConteo = () => {
            clearInterval(idIntervalo);
            tiempoInicio = null;
            duracion.textContent = "";
        }

        const detenerGrabacion = () => {
            if (!mediaRecorder) return alert("No se está grabando");
            mediaRecorder.stop();
            mediaRecorder = null;
        };


        btnComenzarGrabacion.addEventListener("click", comenzarAGrabar);
        btnDetenerGrabacion.addEventListener("click", detenerGrabacion);

        // Cuando ya hemos configurado lo necesario allá arriba llenamos la lista

        llenarLista();
    }

    onMounted(() => {
        init();
    });
</script>

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