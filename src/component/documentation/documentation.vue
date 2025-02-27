<template lang="html">
	<div class="page documentation-page">
		<div class="page-header page-bar">
			<div v-if="!popup">
				<h1>
					<breadcrumb :items="breadcrumb_items" :raw="true" />
				</h1>
			</div>
			<h1 v-else>{{ $t('title') }}</h1>
			<div class="tabs">
				<router-link v-if="!LeekWars.mobile && !popup" :to="'/encyclopedia/' + $i18n.locale + '/' + $t('main.game_rules').replace(/ /g, '_')">
					<div class="tab">
						<v-icon>mdi-help-circle-outline</v-icon>
						{{ $t('main.general_help') }}
					</div>
				</router-link>
				<router-link v-if="!LeekWars.mobile && !popup" :to="'/encyclopedia/' + $i18n.locale + '/' + $t('main.tutorial')">
					<div class="tab">
						<v-icon>mdi-laptop</v-icon>
						{{ $t('main.tutorial') }}
					</div>
				</router-link>
				<div class="tab disabled search" icon="search" link="/search">
					<img class="search-icon" src="/image/search.png">
					<input v-model="query" ref="search" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
				</div>
				<div v-if="!popup" class="tab action" icon="search" link="/search" @click="toggleLarge">
					<v-icon v-if="LeekWars.large">mdi-fullscreen-exit</v-icon>
					<v-icon v-else>mdi-fullscreen</v-icon>
				</div>
			</div>
		</div>
		<div class="container documentation last">
			<div v-show="!LeekWars.mobile || !LeekWars.splitBack" class="column4">
				<panel class="first">
					<div slot="content"class="items-list">
						<div v-for="(category, c) of filteredCategories" :key="category.id">
							<h2 v-ripple @click="toggleCategory(c)">
								<v-icon>{{ icons[c] }}</v-icon> {{ $t('doc.function_category_' + categories[c].name) }} <span v-if="query.length">({{ category.length }})</span>
								<div class="spacer"></div>
								<v-icon v-if="query.length || categoryState[c]">mdi-chevron-up</v-icon>
								<v-icon v-else>mdi-chevron-down</v-icon>
							</h2>
							<div v-if="query.length || categoryState[c]">
								<div v-for="(item, i) in category" :key="i" @click="navigate(item.name)" :item="item.name" class="item">
									{{ item.name }}<span class="arguments" v-if="item.arguments_types">(<span v-for="(arg, i) in item.arguments_names" :key="i"><span v-if="item.optional[i]">[</span><span class="argument">{{ $t('doc.arg_type_' + item.arguments_types[i]) }}</span>&nbsp;{{ arg }}<span v-if="item.optional[i]">]</span><span v-if="i < item.arguments_names.length - 1">, </span></span>)
									<span v-if="item.return_type != 0">
										<span class="arrow">→</span> <span class="argument"> {{ $t('doc.arg_type_' + item.return_type) }}</span>&nbsp;{{ item.return_name }}
									</span></span>
								</div>
							</div>
						</div>
					</div>
				</panel>
			</div>
			<div v-show="!LeekWars.mobile || LeekWars.splitBack" class="column8">
				<div ref="elements" class="items" @scroll="scroll">
					<panel v-for="item of lazy_items" :key="item.id" :item="item.name" :class="{deprecated: item.deprecated}" class="item">
						<documentation-function v-if="'return_type' in item" :fun="item" />
						<documentation-constant v-else :constant="item" />
					</panel>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { locale } from '@/locale'
	import { Constant } from '@/model/constant'
	import { LSFunction } from '@/model/function'
	import { FUNCTIONS } from '@/model/functions'
	import { FUNCTION_BY_ID } from '@/model/function_by_id'
	import { CONSTANTS } from '@/model/constants'
	import { CONSTANT_BY_ID } from '@/model/constant_by_id'
	import { mixins } from '@/model/i18n'
	import { LeekWars } from '@/model/leekwars'
	import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
	import Breadcrumb from '../forum/breadcrumb.vue'
	import DocumentationConstant from './documentation-constant.vue'
	import DocumentationFunction from './documentation-function.vue'
	import(/* webpackChunkName: "[request]" */ /* webpackMode: "eager" */ `@/lang/doc.${locale}.lang`)

	@Component({
		name: 'documentation',
		components: { DocumentationFunction, DocumentationConstant, Breadcrumb },
		i18n: {},
		mixins: [...mixins]
	})
	export default class Documentation extends Vue {
		@Prop({ required: true }) popup!: boolean
		categories: any[] = []
		items: (LSFunction | Constant)[] = []
		query: string = ''
		lazy_start: number = 0
		lazy_end: number = 10
		categoryState: {[key: number]: boolean} = {}
		icons = {
			1: 'mdi-numeric',
			2: 'mdi-format-text',
			3: 'mdi-code-array',
			4: 'mdi-code-braces-box',
			5: 'mdi-account',
			6: 'mdi-sword',
			7: 'mdi-chip',
			8: 'mdi-grid',
			9: 'mdi-sword-cross',
			10: 'mdi-hammer-wrench',
			11: 'mdi-signal-variant',
			12: 'mdi-palette'
		}

		get breadcrumb_items() {
			return [
				{name: this.$t('main.help'), link: '/help'},
				{name: this.$t('title'), link: '/help/documentation'}
			]
		}

		get lower_query() {
			return this.query.toLowerCase()
		}
		get filteredItems() {
			if (this.lower_query.length) {
				return this.items.filter(item => {
					return item.lower_name!.indexOf(this.lower_query) !== -1
						|| item.data!.indexOf(this.lower_query) !== -1
				})
			} else {
				return [...this.items]
			}
		}
		get lazy_items() {
			return this.filteredItems.slice(this.lazy_start, this.lazy_end)
		}
		get filteredCategories() {
			const categories: {[key: number]: any} = {}
			for (const item of this.filteredItems) {
				if (item.deprecated) continue
				if (!(item.category in categories)) categories[item.category] = []
				categories[item.category].push(item)
			}
			return categories
		}

		created() {

			LeekWars.loadEncyclopedia(locale)

			const get_categories = (callback: any) => {
				if (localStorage.getItem('data/function_categories_v2')) {
					callback({categories: JSON.parse(localStorage.getItem('data/function_categories_v2') || '[]')})
				} else {
					LeekWars.get('function/get-categories').then(data => {
						localStorage.setItem('data/function_categories_v2', JSON.stringify(data.categories))
						callback(data)
					})
				}
			}
			get_categories((data: any) => {
				this.categories = data.categories
				for (const category in this.categories) {
					Vue.set(this.categoryState, category, localStorage.getItem('documentation/category-' + category) === 'true')
				}
				let id = 0
				for (const item of FUNCTIONS) {
					if (item.replacement) {
						FUNCTION_BY_ID[item.replacement].replacer = item
					}
				}
				for (const item of FUNCTIONS) {
					this.items.push(item)
					item.lower_name = item.name.toLowerCase()
					item.id = id++
					item.data = ''

					LeekWars.documentation(locale).then(functions => {
						if (item.name in functions) {
							const fun = functions[item.name]
							let new_data = fun.description
							for (const section in fun.primary) {
								new_data += fun.primary[section]
							}
							for (const section in fun.secondary) {
								new_data += fun.secondary[section]
							}
							item.data = new_data.toLowerCase()
						} else {
							let item_data = (this.$t('doc.func_' + item.name) as any).toLowerCase()
							for (const i in item.arguments_names) {
								item_data += (this.$t('doc.func_' + item.name + '_arg_' + (parseInt(i, 10) + 1)) as any).toLowerCase()
							}
							item_data += (this.$t('doc.func_' + item.name + '_return') as any).toLowerCase()
							item.data = item_data
						}
						if (item.replacer) {
							item.data += item.replacer.lower_name!
						}
					})
				}
				for (const item of CONSTANTS) {
					if (item.replacement) {
						CONSTANT_BY_ID[item.replacement].replacer = item
					}
				}
				for (const item of CONSTANTS) {
					this.items.push(item)
					item.lower_name = item.name.toLowerCase()
					item.id = id++
					item.data = (this.$t('doc.const_' + item.name) as string).toLowerCase() + item.value
					if (item.replacer) {
						item.data += item.replacer.lower_name!
					}
				}
				LeekWars.setTitle(this.$i18n.t('title'))
				this.update()
			})
			this.$root.$on('back', this.back)
			this.$root.$on('doc-navigate', this.navigate)
		}
		mounted() {
			if (!this.popup) {
				LeekWars.large = localStorage.getItem('documentation/large') === 'true'
				LeekWars.footer = false
				LeekWars.box = true
			}
			(this.$refs.search as HTMLElement).focus()
		}
		focus() {
			(this.$refs.search as HTMLElement).focus()
		}
		back() {
			this.$router.push('/help/documentation')
		}
		beforeDestroy() {
			LeekWars.large = false
			LeekWars.footer = true
			LeekWars.box = false
			this.$root.$off('back', this.back)
			this.$root.$off('doc-navigate', this.navigate)
		}

		@Watch('$route.params')
		update() {
			if (!this.popup && this.$route.params && 'item' in this.$route.params) {
				LeekWars.splitShowContent()
				this.selectItem(this.$route.params.item)
				LeekWars.setTitle(this.$route.params.item)
			} else {
				LeekWars.splitShowList()
				LeekWars.setTitle(this.$i18n.t('title'))
			}
		}

		navigate(item: string) {
			// console.log("navigate", item, this.popup)
			if (this.popup) {
				this.selectItem(item)
			} else {
				this.$router.push('/help/documentation/' + item)
			}
		}

		selectItem(item: string) {
			if (!this.filteredItems.find((it) => it.name === item)) {
				this.query = ''
			}
			Vue.nextTick(() => {
				const index = this.filteredItems.findIndex((it) => it.name === item)
				if (index !== -1) {
					this.lazy_start = Math.max(0, index - 2)
					this.lazy_end = this.lazy_start + 10
				}
				setTimeout(() => {
					const element: any = document.querySelector('.items .item[item=' + item + ']')
					const elements = this.$refs.elements as HTMLElement
					if (element) {
						const offset = LeekWars.mobile ? 100 : (this.popup ? 185 : 140)
						elements.scrollTo(0, element.offsetTop - offset + 10)
					}
				}, 100)
			})
		}

		@Watch('query')
		queryChange() {
			const items = this.$refs.elements as Element
			items.scrollTop = 0
			this.lazy_start = 0
			this.lazy_end = 10
			if (!this.popup && this.query.length && 'item' in this.$route.params) {
				this.$router.push('/help/documentation')
			}
		}

		scroll(e: Event) {
			const items = this.$refs.elements as Element
			if (items.scrollTop < 100 && this.lazy_start > 0) {
				this.lazy_start = Math.max(0, this.lazy_start - 10)
			}
			if (this.lazy_items.length < this.filteredItems.length) {
				if (items.scrollTop + window.innerHeight + 500 > items.scrollHeight) {
					this.lazy_end += 10
				}
			}
		}

		toggleLarge() {
			LeekWars.large = !LeekWars.large
			localStorage.setItem('documentation/large', '' + LeekWars.large)
		}

		toggleCategory(c: number) {
			this.categoryState[c] = !this.categoryState[c]
			localStorage.setItem('documentation/category-' + c, '' + this.categoryState[c])
		}
	}
</script>

<style lang="scss" scoped>
	.documentation-page {
		display: flex;
		flex-direction: column;
	}
	.documentation {
		min-height: 0;
		height: 100%;
	}
	#app.app .documentation {
		padding-bottom: 0;
	}
	.column4 {
		position: sticky;
		top: 12px;
		height: 100%;
		.panel {
			margin-bottom: 0;
			max-height: 100%;
			& > div {
				padding: 0;
				height: 100%;
			}
		}
	}
	.column8 {
		height: 100%;
	}
	.items-list {
		overflow-y: scroll;
		overflow-x: hidden;
		position: relative;
		height: 100%;
	}
	.items-list h2 {
		font-size: 16px;
		display: flex;
		align-items: center;
		gap: 5px;
		font-weight: bold;
		color: #222;
		position: sticky;
		top: 0;
		padding: 10px 5px;
		padding-left: 10px;
		margin-bottom: 6px;
		background: #f2f2f2;
		cursor: pointer;
	}
	.items-list .item {
		cursor: pointer;
		padding: 4px 10px;
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		&:last-child {
			margin-bottom: 6px;
		}
		.argument {
			color: #0000D0;
			font-weight: 500;
		}
		.arrow {
			font-size: 22px;
			line-height: 14px;
		}
	}
	.items-list .item:hover, .item.router-link-active {
		font-weight: bold;
		background: white;
		box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
	}
	.items {
		overflow-y: scroll;
		overflow-x: hidden;
		height: 100%;
	}
	.items .item {
		position: relative;
		max-height: 999999px;
		height: initial;
		margin-right: 0;
		&::last-child {
			margin-bottom: 5px;
		}
	}
	.items .item:last-child {
		border-bottom: none;
		margin-bottom: 0;
	}
	.items .function-name {
		color: black;
	}
	.items ::v-deep .item.deprecated .content {
		opacity: 0.6;
	}
	.items ::v-deep .item .deprecated-message {
		color: #ff7f00;
		font-weight: bold;
		margin: 10px;
	}
	pre {
		max-width: 500px;
	}
	.search-box {
		display: flex;
		align-items: center;
		padding: 8px;
	}
	.search-box img {
		margin: 4px;
	}
	.tabs {
		flex: 1;
		display: flex;
	}
	.page-bar .search {
		flex: 1;
		input[type=text] {
			height: 27px;
			width: calc(100% - 35px);
			background: #eee;
			color: black;
			font-size: 20px;
			border-radius: 4px;
			vertical-align: bottom;
			margin-left: 5px;
		}
	}
</style>
