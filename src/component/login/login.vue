<template lang="html">
	<div class="page">
		<h1>{{ $t('title') }}</h1>
		<panel class="first">
			<div class="container">
				<div class="column">
					<form @submit.prevent="login">
						<br>
						<div class="title">{{ $t('login') }}</div>
						<input v-model="form.login" type="text" name="login">
						<br><br>
						<div class="title">{{ $t('password') }}</div>
						<input v-model="form.password" type="password" name="password">
						<br><br>
						<v-checkbox v-model="form.keep_connected" :label="$t('keep_connected')" hide-details />
						<br><br>
						<center><v-btn large color="primary" type="submit">{{ $t('connection') }}</v-btn></center>
						<br>
						<div v-if="error" class="error">
							<span v-if="error.error">{{ $t('error_' + error.error) }}</span>
							<span v-else>{{ $t('error_server') }}</span>
						</div>
						<br>
						<router-link class="forgot-password" to="/forgot-password">{{ $t('forgot_password') }}</router-link>
					</form>
				</div>
				<div class="divider"></div>
				<div class="column">
					<v-btn color="black" class="gh-button" @click="githubStart()"> <img src="/image/github_black.png"> {{ $t('main.login_gh') }}</v-btn>
				</div>
			</div>
		</panel>
	</div>

</template>

<script lang="ts">
	import { mixins } from '@/model/i18n'
	import { LeekWars } from '@/model/leekwars'
	import { Component, Vue, Watch } from 'vue-property-decorator'

	@Component({ name: 'login', i18n: {}, mixins: [...mixins] })
	export default class Login extends Vue {
		error: any = null
		form = {
			login: '',
			password: '',
			keep_connected: false
		}

		created() {
			LeekWars.setTitle(this.$t('title'))
			this.form.keep_connected = localStorage.getItem("keep_connected") === 'true'

			const token = this.$route.params.token
			if (token) {
				LeekWars.post('farmer/login-comeback', { token }).then(data => {
					const token = LeekWars.DEV ? data.token : '$'
					this.$store.commit('connect', {...data, token})
					this.$router.push('/')
				}).error(error => {
					LeekWars.toast(error.error)
					this.$router.push('/')
				})
			}
		}

		login() {
			const url = LeekWars.DEV ? 'farmer/login-token' : 'farmer/login'
			LeekWars.post(url, this.form).then(data => {
				const token = LeekWars.DEV ? data.token : '$'
				this.$store.commit('connect', {...data, token})
				this.$router.push('/')
			}).error(error => {
				this.error = error
			})
		}

		@Watch('form.keep_connected')
		changeKeepConnected() {
			localStorage.setItem("keep_connected", this.form.keep_connected ? "true" : "false")
		}

		githubStart() {
			localStorage.setItem('login-attempt', 'true')
			document.location.href = LeekWars.API + "farmer/start-github-login"
		}
	}
</script>

<style lang="scss" scoped>
	form {
		text-align: left;
		width: 290px;
		margin: 0 auto;
	}
	input[type="text"], input[type="password"] {
		width: 100%;
		margin-top: 5px;
	}
	.error {
		color: red;
		text-align: center;
	}
	.forgot-password {
		color: #0a0;
		text-align: center;
		display: block;
	}
	.forgot-password:hover {
		text-decoration: underline;
	}
	.container {
		display: flex;
		max-width: 680px;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		.column {
			flex: 1;
			text-align: center;
			padding: 30px 0;
		}
	}
	.divider {
		background: #bbb;
		width: 1px;
		height: 300px;
	}
	@media screen and (max-width: 599px) {
		.container {
			flex-direction: column;
		}
		.divider {
			width: 300px;
			height: 1px;
		}
	}
	.v-btn.gh-button {
		height: 40px;
		margin-right: 10px;
		img {
			height: 20px;
			margin-right: 5px;
		}
	}
	.title {
		color: #333;
		font-size: 16px;
	}
</style>
