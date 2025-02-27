<template lang="html">
	<div>
		<div class="page-header page-bar">
			<h1>{{ $t('title') }}</h1>
		</div>
		<div class="container grid large top">
			<panel class="first">
				<div class="desc introduction" v-html="$t('intro')"></div>
				<div class="leek-rect">
					<img class="leeks" height="165" width="223" src="/image/signup/signup_illustration.webp">
					<div class="desc" v-html="$t('n_leeks_already', [LeekWars.formatNumber(leek_count)])"></div>
				</div>
			</panel>
			<panel v-if="env.SIGN_UP" :title="fastRegister ? $t('play') : $t('main.signup')" :icon="fastRegister ? 'mdi-sword-cross' : 'mdi-account-plus'">
				<div slot="actions">
					<div v-if="fastRegister" class="button" @click="fastRegister = false"><v-icon>mdi-account-plus</v-icon><span>{{ $t('classic_register') }}</span></div>
					<div v-else class="button" @click="fastRegister = true"><v-icon>mdi-flash-outline</v-icon><span>{{ $t('fast_register') }}</span></div>
				</div>
				<form class="signup-form" method="post" @submit="submit">

					<div class="leek-creator" :class="{fast: fastRegister}">

						<div class="leek">
							<leek-image :leek="{level: 1, skin: leekSkin, hat: leekHat}" :scale="1" />
							<div class="name card">{{ leek ? leek : '?' }}</div>
						</div>

						<div class="infos">
							<div>
								<div class="title">{{ $t('your_leek_name') }}</div>
								<input v-model="leek" :status="status('leek')" name="leek" type="text" required>
								<div v-for="e in errors.leek" :key="e" class="error-msg">{{ e }}</div>
							</div>
							<div>
								<div class="title">{{ $t('skin') }}</div>
								<div class="skins">
									<div v-for="skin in [1, 2, 3, 4, 5, 6, 7, 8]" :key="skin" class="skin" :class="{['skin-' + skin]: true}" @click="leekSkin = skin"></div>
								</div>
							</div>
							<div>
								<div class="title">{{ $t('main.hat') }}</div>
								<div class="hats">
									<img src="/image/hat/no_hat.png" class="hat" @click="leekHat = 0">
									<img v-for="hat in [2, 9, 7, 1]" :key="hat" height="50" :src="'/image/hat/' + LeekWars.hats[hat].name + '.png'" class="hat" @click="leekHat = hat">
								</div>
							</div>
						</div>
					</div>

					<table v-if="!fastRegister">
						<tr>
							<td class="align-right">{{ $t('your_farmer_name') }}</td>
							<td class="align-left">
								<input v-model="login" :status="status('login')" name="login" type="text" required>
								<div v-for="e in errors.login" :key="e" class="error-msg">{{ e }}</div>
							</td>
						</tr>
						<tr>
							<td class="align-right"><i>{{ $t('godfather') }}</i></td>
							<td class="align-left">
								<input v-model="godfather" :status="status('godfather')" type="text">
								<div v-for="e in errors.godfather" :key="e" class="error-msg">{{ e }}</div>
							</td>
						</tr>
						<tr>
							<td><div class="space"></div></td>
						</tr>
						<tr>
							<td colspan="2">
								<v-radio-group v-model="signupMethod" class="radio" :row="true" :dense="true" :hide-details="true">
									<v-radio :label="$t('email_password')" :value="1" />
									<v-radio label="GitHub" :value="2" />
								</v-radio-group>
							</td>
						</tr>
						<tr v-if="signupMethod === 1">
							<td class="align-right">{{ $t('your_email') }}</td>
							<td class="align-left">
								<input v-model="email" :status="status('email')" name="email" type="text" required>
								<div v-for="e in errors.email" :key="e" class="error-msg">{{ e }}</div>
							</td>
						</tr>
						<tr v-if="signupMethod === 1">
							<td class="align-right">{{ $t('password') }}</td>
							<td class="align-left">
								<input v-model="password1" :status="status('password1')" name="password" type="password" required>
								<div v-for="e in errors.password1" :key="e" class="error-msg">{{ e }}</div>
							</td>
						</tr>
						<tr>
							<td><div class="space"></div></td>
						</tr>
						<tr v-if="signupMethod === 2">
							<td><div class="space"></div></td>
						</tr>
					</table>
					<i18n class="cgu" tag="div" path="conditions">
						<router-link slot="link" to="/conditions">{{ $t('conditions_name') }}</router-link>
					</i18n>
					<center>
						<v-btn v-if="fastRegister" large color="primary" type="submit">{{ $t('play_button') }}</v-btn>
						<v-btn v-else-if="signupMethod === 1" large color="primary" type="submit">{{ $t('signup') }}</v-btn>
						<v-btn v-else color="black" type="submit" class="gh-button"> <img src="/image/github_black.png"> {{ $t('signup_gh') }}</v-btn>
					</center>
				</form>
			</panel>
		</div>

		<panel class="features first">
			<div v-for="(feature, f) in features" :key="f" class="feature">
				<div class="images">
					<div v-for="(image, i) in feature.images" :key="i" class="image-wrapper">
						<img height="300" :src="'/image/feature/small_' + image + '.webp'" @click="zoom" loading="lazy">
					</div>
				</div>
				<div class="description">
					<span class="title"><v-icon>{{ feature.icon }}</v-icon> {{ $t(feature.title) }}</span>
					<span v-for="(text, t) in feature.texts" :key="t" v-html="$t(text)"></span>
				</div>
			</div>
			<div v-if="bigImage" class="big" @click="bigImage = null">
				<img :src="bigImage">
			</div>
		</panel>

		<h1>{{ $t('groups') }}</h1>

		<div class="container large large-tiles">
			<panel v-ripple class="first">
				<router-link to="/groups" slot="content">
					<div class="groups">
						<div class="image">
							<leek-image :leek="{level: 300, hat: 2, skin: 12, face: 1}" :scale="0.6" />
							<leek-image :leek="{level: 200, hat: 7, skin: 43, face: 1}" :scale="0.7" />
							<leek-image :leek="{level: 300, hat: 37, skin: 23, face: 1}" :scale="0.8" style="margin-top: 15px" />
							<leek-image :leek="{level: 250, hat: 35, skin: 17, face: 1}" :scale="0.7" :invert="true" style="margin-top: 10px" />
							<leek-image :leek="{level: 200, hat: 7, skin: 20, face: 1}" :scale="0.6" :invert="true" />
						</div>
						<div>
							<h2>{{ $t('groups_title') }}</h2>
							<div>{{ $t('groups_desc') }}</div>
							<center>
								<v-btn>{{ $t('groups_button') }}</v-btn>
							</center>
						</div>
					</div>
				</router-link>
			</panel>
			<!-- <panel v-ripple>
				<router-link to="/press-kit" slot="content" class="flex">
					<div class="image">📦</div>
					<div>
						<h2>{{ $t('main.press-kit') }}</h2>
						<v-btn small>{{ $t('main.press-kit') }}</v-btn>
					</div>
				</router-link>
			</panel> -->
		</div>

		<h1>{{ $t('ranking') }}</h1>

		<panel class="first">
			<div class="container grid">
				<div class="column4">
					<router-link to="/ranking/active">
						<h4>{{ $t('main.leek') }} <span class="arrow">▶</span></h4>
					</router-link>
					<table class="ranking card">
						<tr class="header">
							<th class="p15">{{ $t('main.place') }}</th>
							<th class="p35">{{ $t('main.leek') }}</th>
							<th class="p25">{{ $t('main.talent') }}</th>
						</tr>
						<tr v-for="(leek, i) in leek_ranking" :key="i" :class="leek.style">
							<td>{{ i + 1 }}</td>
							<td :class="leek.class">
								<rich-tooltip-leek :id="leek.id" v-slot="{ on }">
									<router-link :to="'/leek/' + leek.id">
										<span v-on="on">{{ leek.name }}</span>
									</router-link>
								</rich-tooltip-leek>
							</td>
							<td>{{ leek.talent }}</td>
						</tr>
					</table>
				</div>
				<div class="column4">
					<router-link to="/ranking/farmer/active">
						<h4>{{ $t('main.farmer') }} <span class="arrow">▶</span></h4>
					</router-link>
					<table class="ranking card">
						<tr class="header">
							<th class="p15">{{ $t('main.place') }}</th>
							<th class="p35">{{ $t('main.farmer') }}</th>
							<th class="p20">{{ $t('main.talent') }}</th>
							<th class="p5">{{ $t('main.country') }}</th>
						</tr>
						<tr v-for="(farmer, i) in farmer_ranking" :key="i" :class="farmer.style">
							<td>{{ i + 1 }}</td>
							<td :class="farmer.class">
								<rich-tooltip-farmer :id="farmer.id" v-slot="{ on }">
									<router-link :to="'/farmer/' + farmer.id">
										<span v-on="on">{{ farmer.name }}</span>
									</router-link>
								</rich-tooltip-farmer>
							</td>
							<td>{{ farmer.talent }}</td>
							<td>
								<flag v-if="farmer.country" :code="farmer.country" />
							</td>
						</tr>
					</table>
				</div>
				<div class="column4">
					<router-link to="/ranking/team/active">
						<h4>{{ $t('main.team') }} <span class="arrow">▶</span></h4>
					</router-link>
					<table class="ranking card">
						<tr class="header">
							<th class="p20">{{ $t('main.place') }}</th>
							<th class="p50">{{ $t('main.team') }}</th>
							<th class="p30">{{ $t('main.talent') }}</th>
						</tr>
						<tr v-for="(team, i) in team_ranking" :key="i" :class="team.style">
							<td>{{ i + 1 }}</td>
							<td :class="team.class">
								<rich-tooltip-team :id="team.id" v-slot="{ on }">
									<router-link :to="'/team/' + team.id">
										<span v-on="on">{{ team.name }}</span>
									</router-link>
								</rich-tooltip-team>
							</td>
							<td>{{ team.talent }}</td>
						</tr>
					</table>
				</div>
			</div>
		</panel>

		<div class="tiles">
			<a href="https://play.google.com/store/apps/details?id=com.leekwars.app" target="_blank">
				<panel v-ripple class="android">
					<div slot="content">
						<img src="/image/android.png" loading="lazy"> {{ $t('android_app') }}
					</div>
				</panel>
			</a>
			<a href="https://github.com/leek-wars" target="_blank">
				<panel v-ripple class="github">
					<div slot="content">
						<img src="/image/github_black.png" loading="lazy"> GitHub
					</div>
				</panel>
			</a>
			<router-link to="/help">
				<panel v-ripple class="help">
					<div slot="content">
						<v-icon>mdi-book-open-page-variant</v-icon> {{ $t('help_tutorial_doc') }}
					</div>
				</panel>
			</router-link>
			<router-link to="/press-kit">
				<panel v-ripple class="help">
					<div slot="content">
						<span class="icon">📦</span> {{ $t('main.press-kit') }}
					</div>
				</panel>
			</router-link>
		</div>

		<div class="flex carousel-title">
			<h1>{{ $t('screenshots') }}</h1>
			<div class="info"><v-icon>mdi-gesture-swipe-horizontal</v-icon> {{ $t('drag') }}</div>
		</div>

		<panel class="first screenshots">
			<signup-carousel slot="content" :key="$i18n.locale" />
		</panel>

		<h1>{{ $t('last_update') }}</h1>
		<panel v-if="last_version" icon="mdi-star-outline">
			<template slot="title">{{ $t('changelog.version_n', [last_version.version_name]) }} ({{ last_version.date | date }}) {{ translations[last_version.version] && translations[last_version.version].title ? ' — ' + translations[last_version.version].title : '' }}</template>
			<div slot="content">
				<changelog-version :version="last_version" />
			</div>
		</panel>

		<div v-if="bigImage" class="bigscreen" @click="bigImage = null">
			<img :src="'/image/' + bigImage">
			<div class="biglegend">{{ $t(bigImageLegend) }}</div>
		</div>
	</div>
</template>

<script lang="ts">

	/**
	 * mogrify -format webp -quality 50 *.png
	 * for file in *.webp; do convert $file -resize 400 small_$file; done
	 */
	import ChangelogVersion from '@/component/changelog/changelog-version.vue'
	import { locale } from '@/locale'
	import { i18n, loadComponentLanguage, mixins } from '@/model/i18n'
	import { LeekWars } from '@/model/leekwars'
	import { store } from '@/model/store'
	import { Component, Vue, Watch } from 'vue-property-decorator'
	const SignupCarousel = () => import(/* webpackChunkName: "[request]" */ `@/component/signup/signup-carousel.${locale}.i18n`)
	const RichTooltipLeek = () => import('@/component/rich-tooltip/rich-tooltip-leek.vue')
	const RichTooltipFarmer = () => import('@/component/rich-tooltip/rich-tooltip-farmer.vue')
	const RichTooltipTeam = () => import('@/component/rich-tooltip/rich-tooltip-team.vue')

	@Component({ name: 'signup', i18n: {}, mixins: [...mixins], components: {
		ChangelogVersion, SignupCarousel,
		RichTooltipLeek, RichTooltipFarmer, RichTooltipTeam
	} })
	export default class Signup extends Vue {
		godfather: string = ''
		leek_count: number = 85290
		farmer_ranking: any = []
		leek_ranking: any = []
		team_ranking: any = []
		login: string = ''
		leek: string = ''
		email: string = ''
		password1: string = ''
		errors: {[key: string]: string[]} = {}
		bigImage: string | null = null
		bigImageLegend: string = ''
		signupMethod: number = 1
		last_version: any = null
		translations: any = {}
		leekSkin: number = 1
		leekHat: number = 0
		fastRegister: boolean = true

		features = [
			{
				icon: 'mdi-code-braces',
				title: 'ai_title',
				images: ['documentation', 'debug_mark', 'editor_test', 'editor_black', 'editor'],
				texts: ["ai_text1", "ai_text2"]
			},
			{
				icon: 'mdi-wrench-outline',
				title: 'build_title',
				images: ['characteristics', 'leek_chips', 'leek_weapons', 'leek_page'],
				texts: ["build_text1", "build_text2"]
			},
			{
				icon: 'mdi-sword-cross',
				title: 'fight_title',
				images: ['fight_forest', 'fight_glacier', 'garden', 'fight_desert'],
				texts: ["fight_text1", "fight_text2"]
			},
			// {
			// 	icon: 'mdi-memory',
			// 	title: 'items_title',
			// 	images: ['chip_grapple', 'chip_arsenic', 'chip_fortress', 'chip_remission', 'weapon_m_laser', 'chip_meteorite'],
			// 	texts: ["items_text1", "items_text2"]
			// },
			{
				icon: 'mdi-trophy-outline',
				title: "tournament_title",
				images: ['ranking', 'fight_battle_royale', 'fight_tournament', 'tournament'],
				texts: ["tournament_text1", "tournament_text2"]
			},
			{
				icon: 'mdi-trophy-outline',
				title: "trophies_title",
				images: ['trophies_notif', 'trophies', 'trophies_2'],
				texts: ["trophies_text1"]
			},
			{
				icon: 'mdi-auto-fix',
				title: 'customization_title',
				images: ['pomp', 'potions', 'hats', 'leek_style'],
				texts: ["customization_text1"]
			},
			{
				icon: 'mdi-trophy-outline',
				title: "community_title",
				images: ['encyclopedia', 'forum_topic', 'forum', 'comments'],
				texts: ["community_text1"]
			},
		]

		created() {
			LeekWars.setTitle("Leek Wars: online leek programming game")
			this.godfather = 'godfather' in this.$route.params ? this.$route.params.godfather : ''
			LeekWars.get('leek/get-count').then(data => {
				this.leek_count = data.leeks
			})
			LeekWars.get('ranking/get-home-ranking').then(data => {
				data.leeks[0].style = data.farmers[0].style = data.teams[0].style = 'first'
				data.leeks[1].style = data.farmers[1].style = data.teams[1].style = 'second'
				data.leeks[2].style = data.farmers[2].style = data.teams[2].style = 'third'

				this.farmer_ranking = data.farmers
				this.leek_ranking = data.leeks
				this.team_ranking = data.teams
			})
			import(/* webpackChunkName: "changelog-[request]" */ `json-loader!yaml-loader!@/component/changelog/changelog.${this.$i18n.locale}.yaml`).then((translations) => {
				this.translations = translations
			})
			LeekWars.get('changelog/get/' + this.$i18n.locale).then(data => {
				this.last_version = data.changelog[0]
			})

			this.$root.$emit('loaded')
		}

		submit(e: Event) {
			e.preventDefault()
			this.errors = {}
			const service = this.fastRegister ? 'farmer/register-fast' : (this.signupMethod === 1 ? 'farmer/register' : 'farmer/register-github')
			const args = {
				leek_name: this.leek,
				hat: this.leekHat,
				skin: this.leekSkin
			} as any
			if (!this.fastRegister) {
				args.login = this.login
				args.godfather = this.godfather
			}
			if (this.signupMethod === 1) {
				args.password = this.password1
				args.email = this.email
			}
			LeekWars.post(service, args).then(data => {
				if (this.fastRegister) {
					store.commit('connect', data)
					store.commit('connected', '$')
					this.$router.push('/')
				} else if (this.signupMethod === 1) {
					localStorage.setItem('login-attempt', 'true')
					this.$router.push('/signup/success/' + this.login)
				} else {
					localStorage.setItem('login-attempt', 'true')
					const redirect_uri = document.location.origin + "/api/farmer/login-github"
					document.location.href = "https://github.com/login/oauth/authorize?client_id=0253d6b35d4db2a77a3b&scope=user:email&redirect_uri=" + redirect_uri + "&state=" + data.state
				}
			}).error(errors => {
				for (const error of errors) {
					const form = ['login', 'leek', 'email', 'password1', 'password2', 'godfather'][error[0]]
					this.addError(form, this.$t('error_' + error[1], error[2]) as string)
				}
			})
			return false
		}
		successConfirm() {
			this.$router.push('/login')
		}
		addError(form: string, error: string) {
			if (!(form in this.errors)) {
				Vue.set(this.$data.errors, form, [])
			}
			this.errors[form].push(error)
		}
		status(form: string) {
			if (form in this.errors) {
				if (Object.keys(this.errors[form]).length > 0) {
					return 'error'
				} else {
					return 'valid'
				}
			} else {
				return null
			}
		}
		enlarge(image: any) {
			if (LeekWars.mobile) { return }
			this.bigImage = image[0].replace('_small', '')
			this.bigImageLegend = image[1]
		}

		zoom(e: Event) {
			this.bigImage = (e.target as HTMLElement).getAttribute('src')!.replace("small_", "")
		}
	}
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 900px) {
		.top .column6:nth-child(2) .panel {
			margin-top: 12px;
		}
	}
	@media screen and (min-width: 900px) {
		.top {
			display: flex;
		}
		.top .column6 .panel {
			width: 100%;
		}
		.top .column6 {
			display: flex;
		}
	}
	.column4 {
		flex: 1 1 320px;
	}
	.introduction {
		text-align: justify;
	}
	.desc {
		font-size: 18px;
		font-weight: 300;
		padding: 5px;
		b {
			font-weight: 400;
		}
	}
	.leek-rect {
		text-align: center;
	}
	.align-right {
		text-align: right;
		padding: 10px;
		width: 50%;
	}
	.align-left {
		text-align: left;
		width: 50%;
	}
	.signup-form {
		width: 100%;
		margin: 0 auto;
	}
	table {
		width: 100%;
	}
	td.align-right {
		vertical-align: top;
	}
	input[type=text], input[type=password] {
		width: 100%;
		padding: 0 7px;
		background: white;
		height: 30px;
	}
	input[type=text]:focus, input[type=password]:focus {
		border: 2px solid #555;
	}
	input[status=error], input[status=error]:focus {
		border: 2px solid red;
	}
	.error-msg {
		color: red;
		font-size: 12px;
		margin: 5px 0;
	}
	input[status=valid], input[status=valid]:focus {
		border: 2px solid #5fad1b;
	}
	.space {
		height: 8px;
	}
	.signup-message {
		padding: 20px;
	}
	.cgu {
		font-size: 11px;
		text-align: center;
		margin-bottom: 10px;
		a {
			color: #5fad1b;
		}
	}
	.ranking {
		margin: 0 auto;
		width: calc(100% - 20px);
		td {
			border-bottom: 1px solid #ddd;
			border-right: 1px solid #ddd;
			text-align: center;
			padding: 4px 12px;
			background: white;
			a span {
				white-space: nowrap;
			}
		}
		td:last-child {
			border-right: none;
		}
		tr.header {
			background: #e5e5e5;
			text-align: center;
		}
		th {
			padding: 5px 12px;
			font-weight: normal;
			color: #222;
			font-size: 16px;
			border-bottom: 1px solid #fff;
			border-right: 1px solid #fff;
		}
		th:last-child {
			border-right: none;
		}
		.first a {
			color: #ffa900;
			font-weight: bold;
		}
		.second a {
			color: #9c9c9c;
			font-weight: bold;
		}
		.third a {
			color: #ae4e00;
			font-weight: bold;
		}
		.p15 {
			width: 15%;
		}
		.p25 {
			width: 25%;
		}
		.p35 {
			width: 35%;
		}
		.p50 {
			width: 50%;
		}
		.flag {
			height: 18px;
			vertical-align: bottom;
		}
	}
	#app.app .ranking {
		width: 100%;
	}
	h4 {
		margin: 10px;
		margin-top: 0;
		.arrow {
			padding-left: 2px;
		}
	}
	.tiles {
		display: grid;
		grid-gap: 12px;
		width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		margin-bottom: 12px;
		line-height: 44px;
		font-size: 19px;
		.panel {
			margin: 0;
		}
		.text {
			text-align: center;
		}
	}
	#app.app .tiles {
		width: 100%;
	}
	.android {
		img {
			height: 30px;
			margin-top: 10px;
			margin-left: 6px;
			margin-right: 8px;
			vertical-align: bottom;
		}
	}
	.github {
		img {
			height: 40px;
			margin: 2px;
			margin-left: 12px;
			margin-right: 12px;
			vertical-align: bottom;
		}
	}
	.help {
		i {
			font-size: 42px;
			vertical-align: bottom;
			margin-bottom: 1px;
			margin-left: 12px;
			margin-right: 10px;
		}
		.icon {
			font-size: 36px;
			vertical-align: bottom;
			margin-bottom: 1px;
			margin-left: 12px;
			margin-right: 8px;
		}
	}
	.slide {
		width: auto;
	}
	.v-btn.gh-button {
		height: 40px;
		margin-right: 10px;
		img {
			height: 20px;
			margin-right: 5px;
		}
	}
	.radio {
		width: 100%;
		margin-bottom: 6px;
	}
	.carousel-title {
		align-items: center;
	}
	.info {
		color: #eee;
	}
	.leek-creator {
		display: flex;
		padding: 10px;
		gap: 20px;
		align-items: flex-end;
		&.fast {
			margin-bottom: 15px;
		}
		.leek {
			flex: 1;
			text-align: center;
			flex: 120px 0 0;
			.name {
				margin-top: 5px;
				font-weight: 500;
				background: white;
				height: 24px;
				padding: 3px 5px;
				max-width: 120px;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		.infos {
			display: flex;
			flex-direction: column;
			gap: 8px;
			flex: 3;
			min-width: 0;
			.title {
				font-weight: 500;
				margin-bottom: 5px;
			}
		}
		.skins, .hats {
			display: flex;
			flex-wrap: wrap;
			gap: 3px;
		}
		.skin {
			width: 35px;
			height: 35px;
			border-radius: 50%;
			border: 2px solid white;
			box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
			cursor: pointer;
		}
		.hats {
			margin-right: -10px;
		}
		.hat {
			max-width: 70px;
			max-height: 50px;
			object-fit: contain;
			cursor: pointer;
		}
	}
	#app.app .leek-creator {
		padding: 0;
		gap: 10px;
	}
	#app.app .leek {
		margin: 0;
	}

.features {
	padding: 10px 0;
}
.feature {
	display: flex;
	font-size: 18px;
	font-weight: 300;
	margin: 5px 0;
	.images {
		display: flex;
		flex: 3;
		height: 300px;
		min-width: 0;
		justify-content: flex-end;
	}
	.image-wrapper {
		min-width: 0;
		display: flex;
		max-width: 200px;
		height: 300px;
		justify-content: flex-end;
	}
	img {
		border: 5px solid white;
		box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
		border-radius: 5px;
		min-width: 0;
		max-width: 380px;
		flex-shrink: 0;
		transform-style: preserve-3d;
		transform: perspective(800px) rotateY(25deg);
		transition: all 0.2s ease;
		cursor: zoom-in;
	}
	&:nth-child(2n) {
		flex-direction: row-reverse;
		.images {
			flex-direction: row-reverse;
		}
		img {
			transform: perspective(800px) rotateY(-25deg);
			&:hover {
				transform: perspective(800px) rotateY(-15deg) translateX(50px);
			}
		}
		.image-wrapper {
			justify-content: flex-start;
		}
		.image-wrapper:last-child img:hover {
			transform: perspective(800px) rotateY(-15deg);
		}
	}
	&:nth-child(2n+1) {
		img {
			&:hover {
				transform: perspective(800px) rotateY(15deg) translateX(-50px);
			}
		}
		.image-wrapper:last-child img:hover {
			transform: perspective(800px) rotateY(15deg);
		}
		.description {
			padding-right: 10px;
		}
	}
	.description {
		display: flex;
		flex: 2;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		.title {
			font-size: 22px;
			font-weight: 400;
			position: relative;
			align-self: flex-start;
			display: flex;
			align-items: center;
			margin-bottom: 30px;
			&:after {
				width: 100%;
				background: #5fad1b;
				height: 2px;
				content: "";
				position: absolute;
				bottom: -6px;
				left: 0;
			}
			.v-icon {
				margin-right: 6px;
				font-size: 26px;
			}
		}
		span {
			margin-bottom: 20px;
			text-align: justify;
		}
	}
}
#app.app .feature {
	flex-direction: column-reverse;
	&:not(:last-child) .images {
		margin-bottom: 20px;
	}
	img {
		transform: none;
		max-width: calc(100vw - 30px);
		box-shadow: none;
	}
}
.big {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	background: #000a;
	z-index: 10;
	img {
		max-width: 1500px;
		border: 5px solid white;
		box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
		border-radius: 10px;
	}
}
.large-tiles {
	.image {
		flex: 90px 0 0;
		font-size: 90px;
	}
	.flex {
		justify-content: flex-start;
		padding: 10px;
		gap: 15px;
		align-items: center;
		font-weight: 300;
		height: 100%;
	}
	h2 {
		font-weight: 500;
		color: #222;
		font-size: 20px;
		margin-bottom: 10px;
	}
	.v-btn {
		margin-top: 10px;
		margin-left: 0px;
	}
}
.groups {
	display: flex;
	flex-direction: column;
	gap: 0;
	padding: 15px;
	.image {
		display: flex;
		text-align: center;
		align-items: flex-start;
		justify-content: center;
		margin: 10px 0;
		svg {
			max-width: calc(20% + 20px);
			margin-left: -10px;
			margin-right: -10px;
		}
	}
	.v-btn {
		margin-top: 20px;
	}
}
</style>
