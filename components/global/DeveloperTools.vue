<template>
	<div v-if="active" class="c-developer-tools">
		<div
			v-if="columnsActive"
			:class="[
				'fixed top-0 left-0 w-screen h-screen',
				'pointer-events-none z-50',
			]"
		>
			<div
				:class="['w-full h-full max-w-layout-max', 'mx-auto px-layout-margin']"
			>
				<div
					:class="[
						'w-full h-full grid gap-x-layout-gutter',
						'grid-cols-4 >=768:grid-cols-12',
					]"
				>
					<div
						v-for="index in themeConfig.layout.columns.lg"
						:key="`column-${index}`"
						:class="[
							'bg-black bg-opacity-5 h-full',

							{
								'hidden >=768:block': index > themeConfig.layout.columns.sm,
							},
						]"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { config as themeConfig } from '~/components/global/ThemeConfiguration';

/**
 * Controls:
 * G = Grid
 * T = Theme Config
 */

export default {
	name: 'DeveloperTools',

	data() {
		return {
			columnsActive: false,
			themeConfigActive: false,
		};
	},

	computed: {
		active() {
			return this.columnsActive || this.themeConfigActive;
		},

		themeConfig() {
			return themeConfig;
		},
	},

	mounted() {
		window.addEventListener('keydown', this.onKeyDown);
	},

	beforeDestroy() {
		window.removeEventListener('keydown', this.onKeyDown);
	},

	methods: {
		onKeyDown({ keyCode }) {
			const { activeElement } = document;
			if (activeElement === document.body || activeElement == null) {
				// G = Grid
				if (keyCode === 71) {
					this.columnsActive = !this.columnsActive;
				}
				// T = Theme Config
				if (keyCode === 84) {
					// this.themeConfigActive = !this.themeConfigActive;
					console.log(
						'Just getting ready for a config overlay',
						this.themeConfig
					);
				}
			}
		},
	},
};
</script>

<style lang="postcss">
.c-developer-tools {
	z-index: 999999;
}
</style>
