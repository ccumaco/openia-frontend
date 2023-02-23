<template>
	<div>
		<nav class="primary-nav">
			<div class="container">
				<router-link to="/" class="logo">
					<img src="/images/logo-architext.png" alt="" width='150'>
				</router-link>
				<i class='pi pi-bars open-menu' :style='{fontSize: "1.8rem"}' @click='showMenu = !showMenu'></i>
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
						<span>X</span>
					</div>
					<router-link v-if="store.user.userToken == null" to="/login" @click='showMenu = !showMenu'>
						Iniciar sesión
					</router-link>
					<template v-for='(item, index) of routes' >
						<router-link v-if="store.user.userToken && item.to" :to='`${item.to}`' @click='showMenu = !showMenu'>
							{{ item.label }}
						</router-link>
					</template>
					<div
						class="close-session"
						@click='store.logout(), showMenu = !showMenu'
						v-if='store.user.userToken'
					>
						Cerrar sesion
					</div>

					<router-link v-if="store.user.userToken == null" to="/register" class="mobile-menu--create"
						@click='showMenu = !showMenu'>
						Crear cuenta
					</router-link>
				</div>
			</div>
		</nav>
	</div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useOpenIaStore } from '../stores/global-store';
export default {
	setup() {
		const store = useOpenIaStore();
		const showMenu = ref(false);
		const routes = [
			{
				label: 'Productos',
				icon: 'pi pi-book',
				to: '/products',
			},
			{
				label: 'Cuenta',
				icon: 'pi pi-user',
				to: '/profile',
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
			if (window.location.pathname == '/login' ||  window.location.pathname == '/register') {
				buttons?.setAttribute('style', "display:none")
				nav?.setAttribute('style', "position: absolute")
				return
			}
			nav?.setAttribute('style', "position: sticky")
			buttons?.setAttribute('style', "display:flex")
			return
			
		}
		const route = useRoute()
		onMounted(() => hiddenButtons)
		watch(() => route.path, hiddenButtons)
		return {
			store,
			routes,
			toggle,
			menu,
			showMenu,
			hiddenButtons
		};
	},
};
</script>

<style lang="scss">
@import '../styles/global-styles.scss';

.primary-nav {
	background: #000000d9;
	width: 100%;
	padding: 10px 30px;
	top: 0;
	position: fixed;
	z-index: 3;
	@include screen("sm"){
		padding: 10px 15px 10px 5px;
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
			display: none;
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
		display: block;
		position: absolute;
		height: 100vh;
		top: 0;
		width: 50%;
		transition: all .3s linear;
		background: $white;
		display: flex;
		flex-direction: column;
		right: -100%;

		&.active {
			right: 0;
		}

		a, .close-session {
			text-align: center;
			padding: 20px;
			color: $white;
			border-bottom: 1px solid $white;
			background-color: $primary-color;
			transition: all .3s linear;

			&:target {
				background: rgba($color: $primary-color, $alpha: .7);
			}
		}

		.close {
			color: $black;
			display: block;
			text-align: right;
			padding: 10px 20px;
			font-size: 20px;
			font-weight: bold;
		}
	}
}

.open-menu {
	display: none !important;

	@include screen("sm") {
		display: block !important;
	}
}</style>
