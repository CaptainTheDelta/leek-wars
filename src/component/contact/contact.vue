<template lang="html">
	<div class="page">
		<div class="page-bar page-header">
			<h1>{{ $t('title') }}</h1>
		</div>
		<panel class="first">
			<center>
				<div class="text">{{ $t('intro') }}</div>

				<a href="mailto:contact@leekwars.com" target="_blank">
					<div class="card" v-ripple>
						<i18n path="email">
							<span slot="email">contact@leekwars.com</span>
						</i18n>
					</div>
				</a>
			</center>
		</panel>
	</div>
</template>

<script lang="ts">
	import { LeekWars } from '@/model/leekwars'
	import { Component, Vue } from 'vue-property-decorator'

	@Component({ name: 'contact', i18n: {} })
	export default class Contact extends Vue {
		created() {
			LeekWars.setTitle(this.$t('title'))
		}
	}
</script>

<style lang="scss" scoped>
.text {
	font-size: 20px;
	padding: 30px 0;
}
a {
	color: black;
	font-weight: 500;
}
h2 {
	margin-bottom: 20px;
}
h4 {
	margin-bottom: 10px;
}
.card {
	padding: 20px 30px;
	display: inline-block;
	line-height: 1.5;
	margin-bottom: 30px;
}
</style>