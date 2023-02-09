<template>
	<div class="payments">
		<div class="grey-background">
			<div class="container-info">
				<h3 class="title-select">Selecciona tu plan</h3>
				<div class="btn-container flex justify-content-center mt-4">
					<label class="switch btn-color-mode-switch">
						<input
							v-model="isPerYear"
							type="checkbox"
							name="color_mode"
							id="color_mode"
							value="1"
						/>
						<label
							for="color_mode"
							data-on="Mensual"
							data-off="Anual (Ahorra 25%)"
							class="btn-color-mode-switch-inner"
						></label>
					</label>
				</div>
				<div v-if="!isPerYear" class="card-plan">
					<h2>Plan</h2>
					<h3 class="price">$37.500/mes</h3>

					<p class="context">
						Perfecto para cualquier persona y empresas que manejen textos cortos
						como redes sociales, mails, introducciones sencillas, descripciones,
						anuncios.
					</p>
					<ul>
						<li>Palabras ilimitadas</li>
						<li>Diversas plantillas</li>
						<li>Optimización SEO</li>
						<li>Lista de consejos para textos</li>
						<li>+26 idiomas de trabajo</li>
						<li>Soporte por whatsapp o mail</li>
					</ul>
				</div>
				<div v-if="isPerYear" class="card-plan">
					<h2>Plan</h2>
					<h3 class="price">$37.500/Año</h3>

					<p class="context">
						Perfecto para cualquier persona y empresas que manejen textos cortos
						como redes sociales, mails, introducciones sencillas, descripciones,
						anuncios.
					</p>
					<ul>
						<li>Palabras ilimitadas</li>
						<li>Diversas plantillas</li>
						<li>Optimización SEO</li>
						<li>Lista de consejos para textos</li>
						<li>+26 idiomas de trabajo</li>
						<li>Soporte por whatsapp o mail</li>
					</ul>
				</div>
				<div class="flex justify-content-center mt-4">
					<div class="btn transparent">
						<i class="pi pi-arrow-left mr-2"></i>
						volver
					</div>
					<a
						mp-mode="dftl"
						href="https://www.mercadopago.com.co/subscriptions/checkout?preapproval_plan_id=2c938084862672420186346676d50f5c"
						name="MP-payButton"
						class="btn"
						target='_parent'
						>Suscribirme</a
					>
					<div class="btn" @click="store.takeMonth">Pagar</div>
				</div>
			</div>
		</div>
		<!-- Step #2 -->
		<form id="form-checkout" >
			<input type="text" name="cardNumber" id="form-checkout__cardNumber" :placeholder='cardForm.form' />
			<input type="text" name="cardExpirationMonth" id="form-checkout__cardExpirationMonth" />
			<input type="text" name="cardExpirationYear" id="form-checkout__cardExpirationYear" />
			<input type="text" name="cardholderName" id="form-checkout__cardholderName"/>
			<input type="email" name="cardholderEmail" id="form-checkout__cardholderEmail"/>
			<input type="text" name="securityCode" id="form-checkout__securityCode" />
			<select name="issuer" id="form-checkout__issuer"></select>
			<select name="identificationType" id="form-checkout__identificationType"></select>
			<input type="text" name="identificationNumber" id="form-checkout__identificationNumber"/>
			<select name="installments" id="form-checkout__installments"></select>
			<button type="submit" id="form-checkout__submit">Pagar</button>
			<progress value="0" class="progress-bar">Cargando...</progress>
		</form>
	</div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useOpenIaStore } from '../stores/global-store';
export default defineComponent({
	name: 'payments',
	props: {},
	setup() {
		const store = useOpenIaStore();
		const mp = new MercadoPago('TEST-173adfa9-11ef-4f80-8864-ebc8100fe0d9');
		const isPerYear = ref(true)
		onMounted(() => {
			store.validateToken();
			console.log(document.getElementById('form-checkout'));
		})
		// Step #3
		const cardForm = setTimeout(() => {
			mp.cardForm({
		amount: "16500",
		autoMount: true,
		form: {
			id: "form-checkout",
			cardholderName: {
			id: "form-checkout__cardholderName",
			placeholder: "Titular de la tarjeta",
			},
			cardholderEmail: {
			id: "form-checkout__cardholderEmail",
			placeholder: "E-mail",
			},
			cardNumber: {
			id: "form-checkout__cardNumber",
			placeholder: "Número de la tarjeta",
			},
			cardExpirationMonth: {
			id: "form-checkout__cardExpirationMonth",
			placeholder: "Mes de vencimiento",
			},
			cardExpirationYear: {
			id: "form-checkout__cardExpirationYear",
			placeholder: "Año de vencimiento",
			},
			securityCode: {
			id: "form-checkout__securityCode",
			placeholder: "Código de seguridad",
			},
			installments: {
			id: "form-checkout__installments",
			placeholder: "Cuotas",
			},
			identificationType: {
			id: "form-checkout__identificationType",
			placeholder: "Tipo de documento",
			},
			identificationNumber: {
			id: "form-checkout__identificationNumber",
			placeholder: "Número de documento",
			},
			issuer: {
			id: "form-checkout__issuer",
			placeholder: "Banco emisor",
			},
		},
		callbacks: {
			onFormMounted: error => {
			if (error) return console.warn("Form Mounted handling error: ", error);
			console.log("Form mounted");
			},
			onSubmit: event => {
			event.preventDefault();

			const {
				paymentMethodId: payment_method_id,
				issuerId: issuer_id,
				cardholderEmail: email,
				amount,
				token,
				installments,
				identificationNumber,
				identificationType,
			} = cardForm.getCardFormData();

			fetch("/process_payment", {
				method: "POST",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify({
				token,
				issuer_id,
				payment_method_id,
				transaction_amount: Number(amount),
				installments: Number(installments),
				description: "Descripción del producto",
				payer: {
					email,
					identification: {
					type: identificationType,
					number: identificationNumber,
					},
				},
				}),
			});
			},
			onFetching: (resource) => {
			console.log("Fetching resource: ", resource);

			// Animate progress bar
			const progressBar = document.querySelector(".progress-bar");
			progressBar.removeAttribute("value");

			return () => {
				progressBar.setAttribute("value", "0");
			};
			},
		},
		});
		}, 100);
		return {
			isPerYear,
			store,
			cardForm
		};
	},
});
</script>
<style lang="scss">
@import '../styles/global-styles.scss';

.payments {
	min-height: 100vh;

	.title-select {
		text-align: center;
	}

	.grey-background {
		min-width: 50%;
		padding-top: 100px;
		max-width: 700px;
		margin: 0 auto;

		.contianer-btns {
			text-align: center;
			margin-bottom: 20px;
			margin-top: 20px;
		}

		.card-plan {
			background-color: $white;
			max-width: 550px;
			margin: 0 auto;
			border-radius: 10px 10px 80px 80px;
			padding: 50px;
			border: 1px solid $primary-color;

			.price {
				color: $primary-color;
				font-size: 45px;
			}

			.context {
				margin-bottom: 27px;
				margin-top: 45px;
				color: $text;
			}

			ul {
				list-style: '\2713';
				margin-left: 30px;

				li {
					color: $text;
					padding-left: 10px;
					margin-bottom: 19px;
				}
			}
		}
	}

	.black-background {
		max-width: 700px;
		min-width: 50%;
		margin-right: auto;
	}
}
</style>
