<template>
	<div class="hud" :class="{dark: game.autoDark ? (game.map && game.map.options.dark) : game.dark}">
		<div class="life-bar">
			<div class="wrapper">
				<template v-for="team in game.teams">
					<tooltip v-for="entity in team" v-if="!entity.dead" :key="entity.id" top>
						<template v-slot:activator="{ on }">
							<div :style="{background: entity.lifeBarGadient, width: Math.max(1, barWidth * (entity.life / totalLife) - 3) + 'px'}" class="bar" v-on="on"></div>
						</template>
						{{ entity.name }} ({{ entity.life }})
					</tooltip>
				</template>
			</div>
		</div>
		<div v-if="debug" class="debug">
			<div>Particles : {{ game.particles.particles.length }}</div>
			<div>Mouse : ({{ game.mouseX }}, {{ game.mouseY }})</div>
			<div>Mouse tile : ({{ game.mouseTileX }}, {{ game.mouseTileY }})</div>
			<div>Mouse cell : <span v-if="game.mouseCell">{obstacle: {{ game.mouseCell.obstacle }}, entity: <span v-if="game.mouseCell.entity">{{ game.mouseCell.entity.name }}</span>, id: {{ game.mouseCell.id }}, x: {{ game.mouseCell.x }}, y: {{ game.mouseCell.y }}}</span></div>
			<div>FPS : {{ game.fps }}, avg: {{ game.avgFPS }}</div>
			<div>Resources : {{ game.numData }}</div>
		</div>
		<div v-if="!LeekWars.mobile" class="timeline" :class="{large: !game.showActions}" :style="{left: (game.showActions ? (game.largeActions ? actionsWidth + 5 : 400) : 0) + 'px'}">
			<tooltip v-for="(entity, e) of game.entityOrder" :key="e" top>
				<template v-slot:activator="{ on }">
					<div :class="{summon: entity.summon, current: entity.id === game.currentPlayer, dead: entity.dead}" :style="{background: entity === game.selectedEntity || entity === game.mouseEntity ? '#fffc' : (entity.id === game.currentPlayer ? entity.color : entity.gradient)}" class="entity" v-on="on" @mouseenter="entity_enter(entity)" @mouseleave="entity_leave(entity)" @click="entity_click(entity)">
						<div v-if="!entity.dead" :style="{height: 'calc(6px + ' + ((entity.life / entity.maxLife) * 100) + '%)', background: entity.lifeColor, 'border-color': entity.lifeColorLighter}" class="bar"></div>
						<div class="image">
							<img v-if="entity.summon" :src="'/image/bulb/' + entity.bulbName + '_front.png'">
							<turret-image v-else-if="(entity instanceof Turret)" :level="entity.level" :skin="entity.team" :scale="1" />
							<img v-else-if="(entity instanceof Chest)" :src="'/image/chest/' + entity.rawName + '.png'">
							<leek-image v-else :leek="entity" :scale="1" />
						</div>
					</div>
				</template>
				{{ entity.name }}
			</tooltip>
		</div>
		<div v-if="!LeekWars.mobile && game.showActions && actionsWidth > 0" ref="actions" class="fight-actions" :class="{large: game.largeActions}" :style="{'width': game.largeActions ? actionsWidth + 'px' : null, 'max-width': game.largeActions ? Math.max(600, actionsWidth) + 'px' : null}">
			<template v-for="line of game.consoleLines">
				<component :is="ActionComponents[line.action.type]" v-if="line.action" :key="line.id" :action="line.action" />
				<div v-else-if="line.trophy" :key="line.id" class="notif-trophy">
					<img :src="'/image/trophy/' + line.trophy.name + '.svg'">
					<i18n path="trophy.x_unlocks_t">
						<template slot="farmer">{{ line.trophy.farmer.name }}</template>
						<b slot="trophy">{{ $t('trophy.' + line.trophy.name) }}</b>
					</i18n>
				</div>
				<action-log v-else :key="line.id" :log="line.log" :leeks="game.leeks" />
			</template>
		</div>
		<div v-if="game.showActions && game.largeActions" class="resizer" :style="{left: actionsWidth + 'px'}" @mousedown="resizerMousedown"></div>
		<template>
			<entity-details v-if="game.mouseEntity" :entity="game.mouseEntity" :game="game" :dark="game.autoDark ? (game.map && game.map.options.dark) : game.dark" />
			<entity-details v-else-if="game.selectedEntity" :entity="game.selectedEntity" :game="game" :dark="game.autoDark ? (game.map && game.map.options.dark) : game.dark" />
			<entity-details v-else-if="!LeekWars.mobile && game.currentPlayer in game.leeks" :entity="game.leeks[game.currentPlayer]" :game="game" :dark="game.autoDark ? (game.map && game.map.options.dark) : game.dark" />
		</template>
	</div>
</template>

<script lang="ts">
	import EntityDetails from '@/component/player/entity-details.vue'
	import ActionLeekElement from '@/component/report/action-leek.vue'
	import { ActionComponents, EffectComponents } from '@/model/action-components'
	import { i18n } from '@/model/i18n'
	import { LeekWars } from '@/model/leekwars'
	import { TEAM_COLORS } from '@/model/team'
	import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
	import { Chest } from './game/chest'
	import { Game } from './game/game'
	import { Turret } from './game/turret'
	import TurretImage from '@/component/turret-image.vue'
	import { CHIPS } from '@/model/chips'
	import ActionLog from '../report/report-log.vue'

	@Component({ name: 'hud', components: { EntityDetails, leek: ActionLeekElement, TurretImage, 'action-log': ActionLog } })
	export default class Hud extends Vue {
		@Prop({required: true}) game!: Game
		debug: boolean = false
		hover_entity: any | null = null
		Turret = Turret
		Chest = Chest
		actionsWidth: number = 395
		ActionComponents = ActionComponents
		EffectComponents = EffectComponents
		TEAM_COLORS = TEAM_COLORS
		CHIPS = CHIPS

		get barWidth() {
			return LeekWars.mobile ? 300 : 500
		}
		get totalLife() {
			return this.game.leeks.reduce((total, e) => total + (!e.summon ? e.life : 0), 0)
		}
		get darkEnabledtest() {
			return this.game.dark
		}
		get dark() {
			return this.game.autoDark ? (this.game.map && this.game.map.options.dark) : this.game.dark
		}
		get leeks() {
			return this.game.leeks
		}

		created() {
			this.actionsWidth = this.game.actionsWidth
		}

		entity_enter(entity: any) {
			this.game.hoverEntity = entity
			this.game.hoverEntity!.updateReachableCells()
		}
		entity_leave(entity: any) {
			this.game.hoverEntity = null
		}
		entity_click(entity: any) {
			this.game.selectEntity(entity)
		}

		formatTurns(turns: number) {
			return turns === -1 ? '∞' : turns
		}

		resizerMousedown(e: MouseEvent) {
			const startWidth = this.actionsWidth
			const startX = e.clientX
			const visible = this.actionsWidth > 0
			const mousemove: any = (ev: MouseEvent) => {
				let panelWidth = Math.max(0, Math.min(1000, startWidth + ev.clientX - startX))
				if (visible && panelWidth < 60) {
					panelWidth = 0
				}
				this.actionsWidth = panelWidth
			}
			const mouseup: any = (ev: MouseEvent) => {
				document.documentElement!.removeEventListener('mousemove', mousemove)
				document.documentElement!.removeEventListener('mouseup', mouseup)
				this.game.actionsWidth = this.actionsWidth
				if (this.game.actionsWidth === 0) {
					this.game.largeActions = false
					this.actionsWidth = 395
				}
			}
			document.documentElement!.addEventListener('mousemove', mousemove, false)
			document.documentElement!.addEventListener('mouseup', mouseup, false)
			e.preventDefault()
		}
	}
</script>

<style lang="scss" scoped>
	.timeline {
		position: absolute;
		bottom: 5px;
		left: 400px; right: 400px;
		text-align: center;
		white-space: nowrap;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		gap: 2px;
		&.large {
			left: 0;
		}
	}
	.timeline .entity {
		display: inline-flex;
		vertical-align: bottom;
		flex: 0 1 65px;
		height: 100px;
		min-width: 0;
		padding: 3px 0;
		position: relative;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		align-items: flex-end;
		cursor: pointer;
		min-width: 0;
		&.current:before {
			content: "";
			position: absolute;
			left: calc(50% - 18px);
			top: -10px;
			width: 36px;
			height: 20px;
			background-image: url('../../../public/image/fight/arrow.svg');
			background-size: cover;
		}
	}
	.timeline .entity.dead {
		opacity: 0.3;
	}
	.timeline .entity .bar {
		flex: 7px 0 0;
		border-top-left-radius: 3px;
		border: 1px solid black;
		margin-top: -3px;
		margin-bottom: -3px;
	}
	.timeline .entity .image {
		max-width: 100%;
		max-height: 100%;
		overflow: hidden;
		padding: 0 4px;
	}
	.timeline .entity .image svg, .timeline .entity .image img {
		max-width: 50px;
		max-height: 80px;
	}
	.timeline .entity.summon {
		flex: 0 1 50px;
		height: 60px;
	}
	.timeline .entity.summon.current {
		width: 51px;
		height: 61px;
	}
	.timeline .entity.summon .bar {
		margin-right: 4px;
	}
	.timeline .entity.summon img {
		max-width: 30px;
		max-height: 50px;
	}
	.timeline .entity:hover .details, .details.visible {
		display: block;
	}
	.life-bar {
		position: absolute;
		top: 0; left: 0; right: 0;
		text-align: center;
	}
	#app.app .life-bar {
		transform: scale(0.7);
		transform-origin: top;
	}
	.life-bar .wrapper {
		display: inline-block;
		background: #fffa;
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
		padding-top: 3px;
		padding-left: 4px;
		padding-bottom: 0px;
		padding-right: 1px;
		height: 16px;
	}
	.hud.dark .life-bar .wrapper {
		background: #000a;
	}
	.life-bar .bar {
		display: inline-block;
		margin-right: 3px;
		height: calc(100% - 3px);
		vertical-align: top;
	}
	.life-bar .bar.dead {
		margin-right: 0px;
	}
	.life-bar .wrapper :first-of-type {
		border-bottom-left-radius: 10px;
	}
	.life-bar .wrapper :last-of-type {
		border-bottom-right-radius: 10px;
	}
	.fight-actions {
		text-align: left;
		max-height: 100px;
		width: 395px;
		overflow: hidden;
		position: absolute;
		background: #fff;
		border-top-right-radius: 5px;
		box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
		left: 0;
		bottom: 5px;
		padding: 6px;
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		&::-webkit-scrollbar {
			width: 4px;
		}
		&:not(.large) {
			&:hover {
				max-height: calc(100% - 5px);
				height: auto;
				width: 600px !important;
				background-color: #f2f2f2ee;
				border-top-right-radius: 0;
			}
			.log {
				width: 600px;
			}
		}
		&.large {
			height: calc(100% - 5px);
			max-height: calc(100% - 5px);
			max-width: 1000px;
			border-top-right-radius: 0;
			background-color: #fff;
			&:hover {
				width: max(100%, 600px) !important;
				background-color: #f2f2f2dd;
			}
		}
		& > div {
			padding: 1px 0;
			font-size: 14px;
			width: max(588px, 100%);
		}
		pre {
			width: max(588px, 100%);
		}
	}
	.resizer {
		position: absolute;
		width: 30px;
		margin-left: -15px;
		bottom: 0;
		top: 0;
		cursor: ew-resize;
		z-index: 5;
		user-select: none;
		&:hover {
			background: #7773;
		}
	}
	.hud.dark {
		.fight-actions {
			background-color: #222;
			color: #eee;
			&:hover {
				background-color: #222d;
			}
		}
	}
	.debug {
		position: absolute;
		top: 0;
		left: 0;
		text-align: left;
		background: rgba(255,255,255,0.9);
		padding: 5px;
		pointer-events: none;
	}
	.pause {
		color: #999;
	}
	.warning {
		color: #ff5f00;
	}
	.error {
		color: #ff1900;
	}
	.notif-trophy {
		color: black;
		padding: 4px;
		display: flex;
		align-items: center;
		white-space: nowrap;
		gap: 6px;
		margin: 5px 0;
		img {
			width: 36px;
		}
	}
	#app.app .details-wrapper {
		transform: scale(0.5);
		transform-origin: bottom right;
	}
</style>