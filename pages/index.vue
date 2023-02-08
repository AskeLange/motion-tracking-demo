<template>
	<div class="p-frontpage">
		<VideoCapture
			class="fixed top-layout-margin right-layout-margin w-4/12col"
			@update="onUpdate"
		/>

		<div
			:class="[
				'fixed bottom-layout-margin left-layout-margin',
				'border border-secondary',
				'w-12/12col',
			]"
			:style="`height: calc(100vh - 72px * 2 - 480px)`"
		>
			<div
				v-if="rwrist"
				:class="[
					'absolute top-1/2',
					'transform -translate-y-1/2 -translate-x-1/2',
					'rounded-full bg-secondary',
				]"
				:style="{
					left: `${((1 - rwrist.x) * 0.96 + 0.02) * 100}%`,
					width: '32px',
					height: '20px',
				}"
			></div>
			<div
				v-if="lwrist"
				:class="[
					'absolute top-1/2',
					'transform -translate-y-1/2 -translate-x-1/2',
					'rounded-full bg-tertiary',
				]"
				:style="{
					left: `${((1 - lwrist.x) * 0.96 + 0.02) * 100}%`,
					width: '32px',
					height: '20px',
				}"
			></div>
		</div>
	</div>
</template>

<script>
import VideoCapture from '~/components/main/VideoCapture';

export default {
	name: 'FrontPage',
	components: { VideoCapture },

	data() {
		return {
			rwrist: null,
			lwrist: null,
		};
	},

	methods: {
		onUpdate(points) {
			this.rwrist = points.find(({ name }) => name === 'right_wrist');
			this.lwrist = points.find(({ name }) => name === 'left_wrist');
		},
	},
};
</script>
