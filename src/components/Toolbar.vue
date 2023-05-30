<template>
		<nav class="primary-nav" :class='route.path != "/" ? "menu_int" : "home"' v-if='route.path !== "/login" && route.path !== "/register" ' >
			<div class="container">
				<router-link to="/" class="logo">
					<img v-if='route.path != "/" ' src="/images/logo-color.png" alt="" width='150'>
					<img v-else src="/images/logo-blanco.png" alt="" width='150'>
				</router-link>
				<i class='pi pi-bars open-menu' :style='{ fontSize: "1.8rem" }' @click='showMenu = !showMenu'></i>
				<div class="primary-nav--right">
					<router-link v-if="userStore.userData == null" to="/login" class='btn ini-sesion'>
						Iniciar sesión
					</router-link>
					<p v-else class="flex align-items-center">
						{{ userStore.userData?.displayName }} <i class="pi pi-user ml-1"></i>
					<p @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" class='ml-4 menu'>Menú <i
							class='pi pi-bars ml-1'></i></p>
					<Menu class='mt-3' :model="routes" :popup="true" ref="menu" />
					</p>

					<router-link v-if="userStore.userData == null" to="/register" class="ml-2 btn crea-count">
						Crear cuenta
					</router-link>
					<!-- <p><i class="pi pi-bars mr-1"></i> Menu</p> -->
				</div>
				
				<div class="mobile-menu" :class='showMenu ? "active" : ""'>
					<div class="fondo-mobile"></div>
					<div class="menu_interno">
						<div class='close flex justify-content-between' @click='showMenu = !showMenu'>
							<p>{{ userStore.userData?.displayName }}</p>
							<div class="ar-Close"><i class="pi pi-times" style="font-size: 1.8rem;"></i></div>
						</div>
						<router-link v-if="userStore.userData == null" to="/login" @click='showMenu = !showMenu'>
							Iniciar sesión
						</router-link>
						<template v-for='(item, index) of routes'>
							<router-link v-if="store.user.userToken && item.to" :to='`${item.to}`'
								@click='showMenu = !showMenu'>
								{{ item.label }}
							</router-link>
						</template>
						<div class="close-session" @click='userStore.logoutUser' v-if="userStore.userData">
							Cerrar sesion
						</div>

						<router-link v-if="userStore.userData == null" to="/register" class="mobile-menu--create"
							@click='showMenu = !showMenu'>
							Crear cuenta
						</router-link>
					</div>
				</div>
			</div>
		</nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useOpenIaStore } from '../stores/global-store';
import { useUserStore } from '../stores/user';
const userStore = useUserStore();
const store = useOpenIaStore();
const showMenu = ref(false);
const route = useRoute()
const routes = [
	{
		label: 'Chat',
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
			userStore.logoutUser()
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
	}
	@include screen("sm") {
		padding: 10px 15px 10px 5px;
		background: $primary-color;
	}

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&--register {
		vertical-align: middle;
		border: 1px solid $white;
		padding: 7px 32px;
	}

	&--right {
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
	.ini-sesion{
		background-image: none;
		&:hover{
			background-color: rgba(255, 255, 255, 0.144);
			background-image: none;
		}
		
	}
	.crea-count{
		border: 1px solid white;
		background-image: none;
		&:hover{
			background-color: rgba(255, 255, 255, 0.144);
			background-image: none;
		}
		
	}
	a {
		text-decoration: none;
		color: $white;
		
	}

	.menu {
		cursor: pointer;
		padding: 10px 20px;
		border-radius: 5px;
		background-color: transparent;
		transition: background-color 0.3s ease;
		&:hover{
			background-color: $hover;
		}

		i {
			font-size: 20px;
			vertical-align: middle;
		}
	}
}
.home{
	color: $white;
	.menu{
		&:hover{
			background-color: #0088ff3a;
			transition: transform 0.2s ease, background-color 0.2s ease;
		}
	}
}
.menu_int{
	color: #0089FF;
	position: sticky;
}

.mobile-menu{
	display: none;

	@include screen("sm") {
		position: absolute;
		height: 100vh;
		top: 0;
		width: 100%;
		transition: all .1s linear;
		display: flex;
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
			z-index: 9999;
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
	.fondo-mobile{
		display: none;
		@include screen("sm") {
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			backdrop-filter: blur(10px) brightness(50%);
			-moz-backdrop-filter: blur(10px) brightness(50%);
			-webkit-backdrop-filter: blur(10px) brightness(50%);
			z-index: -1;
			opacity: 0; /* Establece la opacidad inicial en 0 */
  			animation: opacidad 1s ease-in-out forwards;
			animation-delay: 2s;
		}
		@keyframes opacidad {
			0% {
				opacity: 0; /* Establece la opacidad inicial en 0 */
			}
			100% {
				opacity: 1; /* Establece la opacidad final en 1 */
			}
			}
	}
	.menu_interno {
		width: 80%;
		background-color: rgb(49, 49, 49);
		display: flex;
		flex-direction: column;
		padding-bottom: 100px;
		justify-content: flex-end;
  		height: 100vh;
		transition: all .1s linear;
		position: absolute;
		right: 0px;
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

