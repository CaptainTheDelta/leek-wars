import { locale } from '@/locale'

const About = () => import(/* webpackChunkName: "[request]" */ `@/component/about/about.${locale}.i18n`)
const AcceptConditions = () => import(/* webpackChunkName: "[request]" */ `@/component/accept-conditions/accept-conditions.${locale}.i18n`)
const AdminEmails = () => import(/* webpackChunkName: "admin" */ `@/component/admin/admin-emails.vue`)
const AdminErrors = () => import(/* webpackChunkName: "admin" */ `@/component/admin/admin-errors.vue`)
const AdminHats = () => import(/* webpackChunkName: "admin" */ `@/component/admin/admin-hats.vue`)
const AdminSkins = () => import(/* webpackChunkName: "admin" */ `@/component/admin/admin-skins.vue`)
const AdminNewsletters = () => import(/* webpackChunkName: "admin" */ `@/component/admin/admin-newsletters.vue`)
const AdminServers = () => import(/* webpackChunkName: "admin" */ `@/component/admin/admin-servers.vue`)
const AdminServices = () => import(/* webpackChunkName: "admin" */ `@/component/admin/admin-services.vue`)
const AdminTrophies = () => import(/* webpackChunkName: "admin" */ `@/component/admin/admin-trophies.vue`)
const AdminGroups = () => import(/* webpackChunkName: "admin" */ `@/component/admin/admin-groups.vue`)
const AdminSources = () => import(/* webpackChunkName: "admin" */ `@/component/admin/admin-sources.vue`)
const Admin = () => import(/* webpackChunkName: "admin" */ `@/component/admin/admin.vue`)
import Error from '@/component/app/error.vue'
const BankBuy = () => import(/* webpackChunkName: "[request]" */ `@/component/bank/bank-buy.${locale}.i18n`)
const BankValidate = () => import(/* webpackChunkName: "[request]" */ `@/component/bank/bank-validate.${locale}.i18n`)
const Bank = () => import(/* webpackChunkName: "[request]" */ `@/component/bank/bank.${locale}.i18n`)
const ChangeEmail = () => import(/* webpackChunkName: "[request]" */ `@/component/change-email/change-email.${locale}.i18n`)
const Changelog = () => import(/* webpackChunkName: "[request]" */ `@/component/changelog/changelog.${locale}.i18n`)
const Conditions = () => import(/* webpackChunkName: "[request]" */ `@/component/conditions/conditions.${locale}.i18n`)
const Contact = () => import(/* webpackChunkName: "[request]" */ `@/component/contact/contact.${locale}.i18n`)
const Documentation = () => import(/* webpackChunkName: "[request]" */ `@/component/documentation/documentation.${locale}.i18n`)
const Group = () => import(/* webpackChunkName: "[request]" */ `@/component/group/group.${locale}.i18n`)
const Groups = () => import(/* webpackChunkName: "[request]" */ `@/component/groups/groups.${locale}.i18n`)
const Editor = () => import(/* webpackChunkName: "[request]" */ `@/component/editor/editor.${locale}.i18n`)
const Encyclopedia = () => import(/* webpackChunkName: "encyclopedia" */ `@/component/encyclopedia/encyclopedia.${locale}.i18n`)
const EncyclopediaSearch = () => import(/* webpackChunkName: "[request]" */ `@/component/encyclopedia/encyclopedia-search.${locale}.i18n`)
const Farmer = () => import(/* webpackChunkName: "[request]" */ `@/component/farmer/farmer.${locale}.i18n`)
const Fight = () => import(/* webpackChunkName: "[request]" */ `@/component/fight/fight.${locale}.i18n`)
const ForgotPassword = () => import(/* webpackChunkName: "[request]" */ `@/component/forgot-password/forgot-password.${locale}.i18n`)
const ForumCategory = () => import(/* webpackChunkName: "[request]" */ `@/component/forum/forum-category.${locale}.i18n`)
const ForumSearch = () => import(/* webpackChunkName: "[request]" */ `@/component/forum/forum-search.${locale}.i18n`)
const ForumTopic = () => import(/* webpackChunkName: "[request]" */ `@/component/forum/forum-topic.${locale}.i18n`)
const Forum = () => import(/* webpackChunkName: "[request]" */ `@/component/forum/forum.${locale}.i18n`)
const Garden = () => import(/* webpackChunkName: "[request]" */ `@/component/garden/garden.${locale}.i18n`)
const GeneralHelp = () => import(/* webpackChunkName: "[request]" */ `@/component/general-help/general-help.vue`)
const Inventory = () => import(/* webpackChunkName: "[request]" */ `@/component/inventory/inventory.${locale}.i18n`)
const LineOfSight = () => import(/* webpackChunkName: "[request]" */ `@/component/line-of-sight/line-of-sight.${locale}.i18n`)
const History = () => import(/* webpackChunkName: "[request]" */ `@/component/history/history.${locale}.i18n`)
const Items = () => import(/* webpackChunkName: "[request]" */ `@/component/items/items.${locale}.i18n`)
const Leek = () => import(/* webpackChunkName: "[request]" */ `@/component/leek/leek.${locale}.i18n`)
const Legal = () => import(/* webpackChunkName: "[request]" */ `@/component/legal/legal.${locale}.i18n`)
const Login = () => import(/* webpackChunkName: "[request]" */ `@/component/login/login.${locale}.i18n`)
const Market = () => import(/* webpackChunkName: "[request]" */ `@/component/market/market.${locale}.i18n`)
const Messages = () => import(/* webpackChunkName: "[request]" */ `@/component/messages/messages.${locale}.i18n`)
const MobileApp = () => import(/* webpackChunkName: "[request]" */ `@/component/mobile-app/mobile-app.${locale}.i18n`)
const Moderation = () => import(/* webpackChunkName: "[request]" */ `@/component/moderation/moderation.${locale}.i18n`)
const ModerationThugs = () => import(/* webpackChunkName: "[request]" */ `@/component/moderation/moderation-thugs.${locale}.i18n`)
const NewLeek = () => import(/* webpackChunkName: "[request]" */ `@/component/new-leek/new-leek.${locale}.i18n`)
const Notifications = () => import(/* webpackChunkName: "[request]" */ `@/component/notifications/notifications.${locale}.i18n`)
const PressKit = () => import(/* webpackChunkName: "[request]" */ `@/component/press-kit/press-kit.${locale}.i18n`)
const Ranking = () => import(/* webpackChunkName: "[request]" */ `@/component/ranking/ranking.${locale}.i18n`)
const Report = () => import(/* webpackChunkName: "[request]" */ `@/component/report/report.${locale}.i18n`)
const Settings = () => import(/* webpackChunkName: "[request]" */ `@/component/settings/settings.${locale}.i18n`)
const Signup = () => import(/* webpackChunkName: "[request]" */ `@/component/signup/signup.${locale}.i18n`)
const Statistics = () => import(/* webpackChunkName: "[request]" */ `@/component/statistics/statistics.${locale}.i18n`)
const SignupResult = () => import(/* webpackChunkName: "[request]" */ `@/component/signup/signup-result.${locale}.i18n`)
const TalentPage = () => import(/* webpackChunkName: "[request]" */ `@/component/talent/talent.${locale}.i18n`)
const Team = () => import(/* webpackChunkName: "[request]" */ `@/component/team/team.${locale}.i18n`)
const Tournament = () => import(/* webpackChunkName: "[request]" */ `@/component/tournament/tournament.${locale}.i18n`)
const Trophies = () => import(/* webpackChunkName: "[request]" */ `@/component/trophies/trophies.${locale}.i18n`)
const TrophyPage = () => import(/* webpackChunkName: "[request]" */ `@/component/trophy/trophy.${locale}.i18n`)
const Tutorial = () => import(/* webpackChunkName: "[request]" */ `@/component/tutorial/tutorial.vue`)
import { LeekWars } from '@/model/leekwars'
import { store } from '@/model/store'
import { vueMain } from '@/model/vue'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Router, { Route, RouteConfig } from 'vue-router'
import { scroll_to_hash } from './router-functions'

@Component({
	components: { signup: Signup, leek: Leek, messages: Messages },
})
class Home extends Vue {
	public functional = true
	get chatFirst() {
		return LeekWars.mobile && localStorage.getItem('options/chat-first') === 'true'
	}
	public mounted() {
		if (this.$store.state.connected && this.chatFirst) {
			const chatID = locale === 'fr' ? 1 : 2
			this.$router.replace('/chat/' + chatID)
		}
	}
	public render(h: any) {
		return this.$store.state.connected ? h('leek') : h('signup')
	}
}

const connected = (to: Route, from: Route, next: any) => {
	if (!store.state.connected) {
		next('/')
	} else {
		next()
	}
}
const disconnected = (to: Route, from: Route, next: any) => {
	if (store.state.connected) {
		next('/')
	} else {
		next()
	}
}

Vue.use(Router)

const routes = [
	{ path: '/', component: Home },
	{ path: '/godfather', component: Home },
	{ path: '/godfather/:godfather', component: Home },
	{ path: '/accept-conditions', component: AcceptConditions, beforeEnter: connected },
	{ path: '/admin', component: Admin, beforeEnter: connected },
	{ path: '/admin/services', component: AdminServices, beforeEnter: connected },
	{ path: '/admin/emails', component: AdminEmails, beforeEnter: connected },
	{ path: '/admin/skins', component: AdminSkins, beforeEnter: connected },
	{ path: '/admin/hats', component: AdminHats, beforeEnter: connected },
	{ path: '/admin/newsletters', component: AdminNewsletters, beforeEnter: connected },
	{ path: '/admin/errors', component: AdminErrors, beforeEnter: connected },
	{ path: '/admin/servers', component: AdminServers, beforeEnter: connected },
	{ path: '/admin/trophies', component: AdminTrophies, beforeEnter: connected },
	{ path: '/admin/groups', component: AdminGroups, beforeEnter: connected },
	{ path: '/admin/sources', component: AdminSources, beforeEnter: connected },
	{ path: '/about', component: About },
	{ path: '/app', component: MobileApp },
	{ path: '/conditions', component: Conditions },
	{ path: '/changelog', component: Changelog },
	{ path: '/change-email/:state/:token', component: ChangeEmail },
	{ path: '/contact', component: Contact },
	{ path: '/encyclopedia', component: Encyclopedia, meta: {scrollOffset: 45} },
	{ path: '/encyclopedia/:page', component: Encyclopedia, meta: {scrollOffset: 45} },
	{ path: '/encyclopedia/:lang/:page', component: Encyclopedia, meta: {scrollOffset: 45} },
	{ path: '/encyclopedia-search', component: EncyclopediaSearch },
	{ path: '/editor', component: Editor, beforeEnter: connected },
	{ path: '/editor/:id', component: Editor, beforeEnter: connected },
	{ path: '/group/:id', component: Group, beforeEnter: connected },
	{ path: '/groups', component: Groups },
	{ path: '/error/:message', component: Error },
	{ path: '/error/:message/:title', component: Error },
	{ path: '/farmer', component: Farmer, beforeEnter: connected },
	{ path: '/farmer/:id', component: Farmer },
	{ path: '/farmer/:id/history', component: History, props: {type: 'farmer'} },
	{ path: '/fight/:id', component: Fight },
	{ path: '/forgot-password', component: ForgotPassword },
	{ path: '/forgot-password/email-sent/:email', component: ForgotPassword, props: {state: 'email_sent'} },
	{ path: '/forgot-password/:id/:code', component: ForgotPassword, props: {state: 'change_password'} },
	{ path: '/garden', component: Garden, beforeEnter: connected },
	{ path: '/garden/:category', component: Garden, beforeEnter: connected },
	{ path: '/garden/:category/:item', component: Garden, beforeEnter: connected },
	{ path: '/garden/:category/:type/:target', component: Garden, beforeEnter: connected },
	{ path: '/garden/:category/:type/:target/:item', component: Garden, beforeEnter: connected },
	{ path: '/help', component: Encyclopedia },
	{ path: '/help/documentation', component: Documentation, props: { popup: false } },
	{ path: '/help/documentation/:item', component: Documentation, props: { popup: false } },
	{ path: '/help/items', component: Items },
	{ path: '/help/line-of-sight', component: LineOfSight },
	{ path: '/help/general', component: GeneralHelp },
	{ path: '/help/tutorial', component: Tutorial },
	{ path: '/inventory', component: Inventory },
	{ path: '/legal', component: Legal },
	{ path: '/login', component: Login, beforeEnter: disconnected },
	{ path: '/login/:token', component: Login },
	{ path: '/leek/:id', name: 'leek', component: Leek },
	{ path: '/leek/:id/history', component: History, props: {type: 'leek'} },
	{ path: '/market', name: 'market', component: Market, meta: {noscrollapp: true}, beforeEnter: connected },
	{ path: '/market/:item', component: Market, meta: {noscrollapp: true}, beforeEnter: connected },
	{ path: '/messages', component: Messages, beforeEnter: connected },
	{ path: '/messages/conversation/:id', component: Messages, beforeEnter: connected },
	{ path: '/messages/new/:farmer_id/:name/:avatar_changed', component: Messages, beforeEnter: connected },
	{ path: '/moderation', component: Moderation, meta: {noscroll: true}, beforeEnter: connected },
	{ path: '/moderation/fault/:id', component: Moderation, meta: {noscroll: true}, beforeEnter: connected },
	{ path: '/moderation/thugs', component: ModerationThugs, meta: {noscroll: true}, beforeEnter: connected },
	{ path: '/new-leek', component: NewLeek, beforeEnter: connected },
	{ path: '/notifications', component: Notifications, beforeEnter: connected },
	{ path: '/press-kit', component: PressKit },
	{ path: '/ranking', component: Ranking },
	{ path: '/ranking/page-:page', component: Ranking },
	{ path: '/ranking/:category', component: Ranking },
	{ path: '/ranking/:category/page-:page', component: Ranking },
	{ path: '/ranking/:category/:order', component: Ranking },
	{ path: '/ranking/:category/:order/page-:page', component: Ranking },
	{ path: '/report/:id', component: Report },
	{ path: '/settings', component: Settings, beforeEnter: connected },
	{ path: '/signup/success/:farmer', component: SignupResult, props: { result: 'success' } },
	{ path: '/signup/failed', component: SignupResult, props: { result: 'failed' } },
	{ path: '/statistics', component: Statistics },
	{ path: '/talent', component: TalentPage },
	{ path: '/team', component: Team, beforeEnter: connected },
	{ path: '/team/:id', component: Team },
	{ path: '/team/:id/history', component: History, props: {type: 'team'} },
	{ path: '/tournament/:id', component: Tournament },
	{ path: '/trophies', component: Trophies, beforeEnter: connected },
	{ path: '/trophies/:id', component: Trophies },
	{ path: '/trophy/:code', component: TrophyPage },
	{ path: '*', component: Error },
] as RouteConfig[]

if (process.env.VUE_APP_SOCIAL === 'true') {
	routes.push(
		{ path: '/forum', component: Forum, beforeEnter: connected },
		{ path: '/forum/category-:category', component: ForumCategory, beforeEnter: connected },
		{ path: '/forum/category-:category/page-:page', component: ForumCategory, beforeEnter: connected },
		{ path: '/forum/category-:category/topic-:topic', component: ForumTopic, beforeEnter: connected },
		{ path: '/forum/category-:category/topic-:topic/page-:page', component: ForumTopic, beforeEnter: connected },
		{ path: '/search', component: ForumSearch, beforeEnter: connected },
		{ path: '/chat', component: Messages, beforeEnter: connected },
		{ path: '/chat/:id', component: Messages, beforeEnter: connected },
		{ path: '/chat/new/:farmer_id/:name/:avatar_changed', component: Messages, beforeEnter: connected },
	)
}
if (process.env.VUE_APP_BANK === 'true') {
	routes.push(
		{ path: '/bank', component: Bank, beforeEnter: connected },
		{ path: '/bank/buy/:pack', component: BankBuy, beforeEnter: connected },
		{ path: '/bank/buy/:pack/:offer', component: BankBuy, beforeEnter: connected },
		{ path: '/bank/validate/', component: BankValidate, beforeEnter: connected },
		{ path: '/bank/validate/success/:crystals', component: BankValidate, props: {success: true}, beforeEnter: connected },
		{ path: '/bank/validate/success/:crystals/:vendor', component: BankValidate, props: {success: true}, beforeEnter: connected },
		{ path: '/bank/validate/failed/:reason', component: BankValidate, props: {success: false}, beforeEnter: connected },
		{ path: '/bank/validate/failed/:vendor/:reason', component: BankValidate, props: {success: false}, beforeEnter: connected },
	)
}

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		// console.log("scrollBehavior", to, from, savedPosition)
		vueMain.$data.savedPosition = 0
		if (to.hash) {
			setTimeout(() => {
				scroll_to_hash(to.hash, to)
			}, 100)
			return null
		}
		if (savedPosition && !from.hash) {
			vueMain.$data.savedPosition = savedPosition.y
		} else if (LeekWars.mobile && !to.meta!.noscrollapp) {
			return { x: 0, y: 0 }
		} else if (!to.meta!.noscrollapp && !to.meta!.noscroll) {
			return { x: 0, y: 0 }
		}
	},
})

router.beforeEach((to: Route, from: Route, next: any) => {

	LeekWars.splitShowList()
	LeekWars.actions = []

	if (window.__FARMER__) {
		store.commit('connected', '$')
	} else {
		const token = LeekWars.DEV ? localStorage.getItem('token') : '$'
		if (localStorage.getItem('connected') === 'true') {
			store.commit('connected', token)
		}
	}

	next()
})

export default router
