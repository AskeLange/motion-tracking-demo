<template>
	<div class="p-frontpage">
		<VideoCapture
			preview
			:class="[
				'fixed top-1/2 left-0 w-full opacity-30',
				'transform -translate-y-1/2',
			]"
			@update="onUpdate"
		/>

		<TimeLine v-if="wrist" :percentage="sum.x" :active="true" />
	</div>
</template>

<script>
import VideoCapture from '~/components/main/VideoCapture';
import TimeLine from '~/components/main/TimeLine';

export default {
	name: 'FrontPage',
	components: { VideoCapture, TimeLine },

	data() {
		return {
			wrist: null,

			sum: {
				x: 0,
				score: 0,
			},
		};
	},

	methods: {
		onUpdate(points) {
			this.wrist = points.find(({ name }) => name === 'right_wrist');

			// let divider = 0;
			// this.sum.x = points
			// 	.filter(({ score }) => score >= 0.5)
			// 	.reduce((cur, acc, { x, score }, _acc) => {
			// 		console.log(cur, acc);
			// 		divider += score;
			// 		return acc + x;
			// 	}, 0);

			// this.sum.x /= divider;

			const a = points.reduce((acc, { x, score }) => {
				return acc + x;
			}, 0);

			this.sum.x = a / points.length;
		},
	},
};
</script>
