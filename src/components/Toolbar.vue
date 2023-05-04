<template>
		<nav class="primary-nav home">
			<div class="container">
				<router-link to="/" class="logo">
					<img src="/images/logo-blanco.png" alt="" width='150'>
				</router-link>
				<i class='pi pi-bars open-menu' :style='{ fontSize: "1.8rem" }' @click='showMenu = !showMenu'></i>
				<div class="primary-nav--rigth">
					<router-link v-if="store.user.userToken == null" to="/login">
						Iniciar sesión
					</router-link>
					<p v-else class="flex align-items-center">
						Bienvenido {{ store.user.userName }} <i class="pi pi-user ml-2"></i>
					<p @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class='ml-4 menu'>Menú <i
							class='pi pi-bars'></i></p>
					<Menu class='mt-3' :model="routes" :popup="true" ref="menu" />
					</p>

					<router-link v-if="store.user.userToken == null" to="/register" class="primary-nav--register">
						Crear cuenta
					</router-link>
					<!-- <p><i class="pi pi-bars mr-1"></i> Menu</p> -->
				</div>
				<div class="mobile-menu" :class='showMenu ? "active" : ""'>
					<div class='close flex justify-content-between' @click='showMenu = !showMenu'>
						<p>{{ store.user.userName }}</p>
						<div class="ar-Close"><i class="pi pi-times" style="font-size: 1.8rem;"></i></div>
					</div>
					<router-link v-if="store.user.userToken == null" to="/login" @click='showMenu = !showMenu'>
						Iniciar sesión
					</router-link>
					<template v-for='(item, index) of routes'>
						<router-link v-if="store.user.userToken && item.to" :to='`${item.to}`'
							@click='showMenu = !showMenu'>
							{{ item.label }}
						</router-link>
					</template>
					<div class="close-session" @click='store.logout(), showMenu = !showMenu' v-if='store.user.userToken'>
						Cerrar sesion
					</div>

					<router-link v-if="store.user.userToken == null" to="/register" class="mobile-menu--create"
						@click='showMenu = !showMenu'>
						Crear cuenta
					</router-link>
				</div>
			</div>
		</nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useOpenIaStore } from '../stores/global-store';
const store = useOpenIaStore();
const showMenu = ref(false);
const route = useRoute()
const routes = [
	{
		label: 'Estilo libre',
		icon: 'pi pi-book',
		to: '/free-style',
	},
	{
		label: 'Cuenta',
		icon: 'pi pi-user',
		to: '/profile',
	},
	{
		label: 'Ayuda',
		icon: 'pi pi-question-circle',
		url: 'https://wa.me/+573132777667?text=saludando desde arquitext',
	},
	// {
	// 	label: 'Ayuda',
	// 	icon: 'pi pi-question-circle',
	// 	to: '/help',
	// },

	{
		label: 'Cerrar sesion',
		icon: 'pi pi-sign-out',
		command: () => {
			console.log('esta haciendo esto');

			store.logout()
			showMenu.value = !showMenu.value
		}
	},
];
const menu = ref();
const toggle = (event: any) => {
	menu.value.toggle(event);
};

const hiddenButtons = () => {
	const buttons = document.querySelector('.primary-nav--rigth')
	const nav = document.querySelector('.primary-nav')
	if (window.location.pathname !== '/') {
		nav?.classList.add('out-home')
		return
	}
	nav?.classList.remove('out-home')

}

const addBackground = () => {
	const nav = document.querySelector('.primary-nav')
	if (nav) {
		if (window.scrollY > 300) {
			nav.classList.add('scrolling')
		} else {
			nav.classList.remove('scrolling')
		}
	}
}

window.addEventListener('scroll',addBackground)

watch(() => route.path, hiddenButtons)
onMounted(() => hiddenButtons())
</script>

<style lang="scss">
@import '../styles/global-styles.scss';

.primary-nav {
	width: 100%;
	padding: 10px 30px;
	position: fixed;
	top: 0;
	z-index: 3;
	background: transparent;
	transition: all .3s linear;
	&.scrolling{
		background: $primary-color;
	}
	&.out-home{
		position: sticky;
		background-color: #050D20;
	}
	@include screen("sm") {
		padding: 10px 15px 10px 5px;
		background: $primary-color;
	}

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: $white;
	}

	&--register {
		vertical-align: middle;
		border: 1px solid $white;
		padding: 7px 32px;
	}

	&--rigth {
		display: flex;
		align-items: center;
		gap: 40px;

		@include screen("sm") {
			display: none !important;
		}
	}

	.logo {
		font-size: 26px;
	}

	a {
		text-decoration: none;
		color: $white;
	}

	.menu {
		cursor: pointer;

		i {
			font-size: 20px;
			vertical-align: middle;
		}
	}
}

.mobile-menu {
	display: none;

	@include screen("sm") {
		justify-content: flex-end;
  		position: absolute;
		height: 100vh;
		top: 0;
		width: 80%;
		transition: all .1s linear;
		border-radius: 30px 0px 0px 30px;
		background: rgba(12, 11, 14, 0.863);
		background: linear-gradient(90deg, rgba(0, 29, 56, 0.89) 0%, rgba(3, 0, 15, 0.884) 100%);
		-webkit-backdrop-filter: blur(5px);
  		backdrop-filter: blur(5px);
		display: flex;
		flex-direction: column;
		right: -100%;
		padding-bottom: 100px;
		.ar-Close{
			padding-top: 14px;
			padding-right: 6px;
			position: absolute;
			top: 10px;
			right: 20px;
		}
		&.active {
			right: 0;
		}

		a,
		.close-session {
			text-align: right;
			padding: 20px;
			color: $white;
			transition: all .3s linear;
			font-family: $regular-font;
			font-size: 2rem;

			&:target {
				background: rgba($color: $primary-color, $alpha: .7);
			}
		}

		.close {
			color: $white;
			display: block;
			text-align: right;
			padding: 10px 20px;
			font-size: 20px;
			font-weight: bold;
			p{
				position: absolute;
				top: 25px;
				left: 30px;
			}
		}
	}
}

.open-menu {
	display: none !important;

	@include screen("sm") {
		display: block !important;
	}
}

.primary-nav.home {}
</style>

