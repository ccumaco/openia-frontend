<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity';
import { useOpenIaStore } from '../stores/global-store';
const store = useOpenIaStore();
const objectText = reactive({
	prompt: '',
	maxLength: 100,
	top_p: 0,
});
const generateDiferentResponse = () => {
	objectText.top_p = 1;
	store.searchWithText(objectText);
};
</script>

<template>
	<h1>WelCome to OpenIa</h1>
	<label for="prompt">Consulta</label>
	<input
		type="text"
		name="prompt"
		placeholder="Has tu consulta"
		v-model="objectText.prompt"
	/>
	<label for="maxLength">Maxima longitud</label>
	<input
		type="number"
		name="maxLength"
		placeholder="Selecciona la cantidad maxima del texto"
		v-model="objectText.maxLength"
	/>
	<p>Su pregunta fue: {{ objectText.prompt }}</p>
	<p>
		Su respuesta es:
		{{ store.responseText ? store.responseText : 'cargando...' }}
	</p>
	<button @click="store.searchWithText(objectText)">Buscar</button>
	<button @click="generateDiferentResponse()">
		generar una respuesta diferente
	</button>
</template>

<style></style>
