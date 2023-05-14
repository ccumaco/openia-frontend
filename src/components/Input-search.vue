
<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useOpenIaStore } from '../stores/global-store';
import { useInputSearch } from '../stores/input-search';
import { useFreeStyleStore } from '../stores/free-style-store';
import mySvg from '../../public/images/before-record.svg'

defineProps({
    mainSearch: {
        type: String,
        require: true,
        default: 'free-style'
    }
})

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


const showSoftStyles = ref(false)
const openSoftStyles = () => {
    showSoftStyles.value = !showSoftStyles.value
}

const mediaRecorder = ref();
const recording = ref(false);
const duration = ref(0);
const listOfDevices = ref([])
const hasUserMediaSupport = () => {
    const devices = !!(navigator.mediaDevices.getUserMedia)
    if (typeof MediaRecorder === "undefined" || !devices) {
        alert('no cuentas con un navegador que soporte microfono')
        return false
    }
};

const idInterval = ref<number | undefined>(undefined);

const startCounting = () => {
  const intervalId: any = setInterval(() => {
    duration.value = duration.value + 1;
    if (duration.value >= 60) {
      stopRecording();
      return;
    }
  }, 1000);
  idInterval.value = intervalId;
};

const stopCounting = () => {
  recording.value = !recording.value;
  duration.value = 0;
  clearInterval(idInterval.value!);
  idInterval.value = undefined;
};

const stopRecording = () => {
    if (!mediaRecorder.value) {
        return alert('No se está grabando');
    }
    mediaRecorder.value.stop();
    mediaRecorder.value = null;
};
const startRecording = async () => {
    hasUserMediaSupport()
    recording.value = !recording.value;
    if (mediaRecorder.value) return alert("Ya se está grabando");
    navigator.mediaDevices.getUserMedia({
        audio: {
            deviceId: listOfDevices.value,
        }
    })
        .then(stream => {
                duration.value = 0;
                mediaRecorder.value = new MediaRecorder(stream);
                mediaRecorder.value.start();
                startCounting();
                const audioExcerpts: Blob[] = [];

                mediaRecorder.value.addEventListener("dataavailable", (event: BlobEvent) => {
                audioExcerpts.push(event.data);
                console.log(audioExcerpts);
                });
                mediaRecorder.value.addEventListener("stop", async () => {
                    const blobAudio = new Blob(audioExcerpts);
                    console.log(blobAudio, "blobAudioblobAudioblobAudio");
                    const formData = new FormData();
                    formData.append("file", blobAudio, `grabacion-${new Date().getTime()}.mp3`);
                    stream.getTracks().forEach(track => track.stop());
                    stopCounting();
                    transcriptAudio(formData);
                });
            }
        )
        .catch(error => {
            // Aquí maneja el error, tal vez no dieron permiso
            console.log(error)
        });
};
const handleEnterPress = (event: KeyboardEvent, mainSearch: string, prompt: string) => {
    if (event.keyCode === 13 && !event.shiftKey) {
        objectToSent.askUser.content = prompt.replace(/\r?\n|\r/g, ''); // Eliminar el carácter de retorno de carro
        makeSearchIn(mainSearch);
    }
}

</script>

<template>
    <div class='input-component'>
        <div class="container-icon" @click='openSoftStyles'>
            <!-- :class='objectToSent.soft' -->
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="26.047" viewBox="0 0 26.047 26.047" >
                <path id="Icon_awesome-magic" data-name="Icon awesome-magic" d="M11.4,4.884l.814-1.628,1.628-.814L12.21,1.628,11.4,0l-.814,1.628-1.628.814,1.628.814ZM4.07,8.14,5.426,5.427,8.14,4.07,5.426,2.713,4.07,0,2.714,2.713,0,4.07,2.714,5.427Zm17.907,6.512-1.356,2.713-2.714,1.357,2.714,1.357,1.356,2.713,1.356-2.713,2.714-1.357-2.714-1.357ZM25.57,4.794,21.253.477a1.627,1.627,0,0,0-2.3,0L.477,18.951a1.627,1.627,0,0,0,0,2.3L4.794,25.57a1.628,1.628,0,0,0,2.3,0L25.57,7.1A1.627,1.627,0,0,0,25.57,4.794Zm-7.284,5.557L15.7,7.761,20.1,3.355l2.59,2.59-4.406,4.406Z" fill="#02c8b4"/>
            </svg>

            <p>Estilo</p>
            <div class="styles-reponse" :class='showSoftStyles ? "show" : ""'>
                <p>Estilo de respuesta</p>
                <div class="styles-reponse--types">
                    <div
                        v-for='(style, index) of softs'
                        class='styles-reponse--types--item'
                        @click='setSoftResponse(style.name)'>
                        {{ style.name }}
                    </div>
                    <!-- :class='objectToSent.soft == style.name ? "active" : ""' -->
                    
                </div>
            </div>
        </div>
        <div class="container-input">
            
            <textarea autofocus
                type="text"
                name="search"
                id="search"
                placeholder='Pregunta o busca lo que quieras'
                v-model='objectToSent.askUser.content'
                @keyup.enter='handleEnterPress($event, mainSearch, objectToSent.askUser.content)'
                :rows='objectToSent.askUser.content.length > 300 ? "3" : (objectToSent.askUser.content.length > 150 ? "2" : "1")'
                
            />
            


            <!-- recording : boolean -->
            <!-- objectToSent.askUser.content: string -->

            <span v-if='objectToSent.askUser.content.length' class="tooltip" data-tooltip="Enviar mensaje">
                <i class='pi pi-send icon-recording send-message' @click='makeSearchIn(mainSearch)'></i>
            </span>

            <span class="tooltip" data-tooltip="Habla y escribiremos por ti">
            <span class="tooltip-info">some more information </span>
                <img
                    src="/images/icon-recording.svg"
                    @click='startRecording()'
                    alt="start to record"
                    width='46'
                    v-show='!recording && !objectToSent.askUser.content.length'
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
                        @click='stopRecording'
                        alt="stop recording"
                        width='46'
                        class='icon-recording stop'
                        id='btnComenzarGrabacion'
                    >
                </span>
            </div>
            
        </div>

        <!-- decomment when you need choose the microphone -->
        <select name="listOfDevices" id="listOfDevices" hidden></select>
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
  @include screen("sm"){
		    right: 54px;
	    }
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
        @include screen("sm"){
		    display: none;
	    }
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
        svg{
            min-width: 26px;
            margin-top: 3px;
        }
        .Creativa path{
            fill: #FFA702;
        }
        .Balanceada path{
            fill:  #0089FF;
        }
        .Precisa path{
            fill: #02C8B4;
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
            &.send-message{
                width: 50px;
                text-align: center;
                margin-top: 7px;
                z-index: 99999;
                color: $titles;
                &::before{
                    z-index: 99999;
                    font-size: 30px;
                }
            }
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