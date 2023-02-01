<template>
	<div>
		<nav class="primary-nav">
			<router-link to="/" class="logo">Incopy</router-link>
			<div class="primary-nav--rigth">
				<router-link v-if="store.user.userToken == null" to="/login">
					<i class="pi pi-user mr-1"></i> Iniciar sesión
				</router-link>
				<p v-else class="flex align-items-center">
					Bienvenido {{ store.user.userName }}
            <Avatar
            shape='circle'
            icon='pi pi-user'
						type="button"
						@click="toggle"
						aria-haspopup="true"
						aria-controls="overlay_menu"
            class='ml-2'
					/>
					<Menu :model="routes" :popup="true" ref="menu" />
				</p>

				<router-link
					v-if="store.user.userToken == null"
					to="/register"
					class="primary-nav--register"
				>
					Crear cuenta
				</router-link>
				<!-- <p><i class="pi pi-bars mr-1"></i> Menu</p> -->
			</div>
		</nav>
	</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useOpenIaStore } from '../stores/global-store';
export default {
	setup() {
		const store = useOpenIaStore();
		const routes = [
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
				label: 'Social media',
				icon: 'pi pi-book',
				to: '/social-media',
			},
			{
				label: 'Cerrar sesion',
				icon: 'pi pi-sign-out',
				command: () => {
					store.logout()
				}
			},
		];
		const menu = ref();
		const toggle = (event: any) => {
			menu.value.toggle(event);
		};
		return {
			store,
			routes,
			toggle,
			menu,
		};
	},
};
</script>

<style lang="scss">
@import '../styles/global-styles.scss';

.primary-nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #000000d9;
	position: fixed;
	top: 0;
	padding: 10px 30px;
	width: 100%;
	z-index: 3;
	color: $white;

	&--register {
		vertical-align: middle;
		border: 1px solid $white;
		padding: 7px 32px;
	}

	&--rigth {
		display: flex;
		align-items: center;
		gap: 40px;
	}

	.logo {
		font-size: 26px;
	}

	a {
		text-decoration: none;
		color: $white;
	}
}
</style>
