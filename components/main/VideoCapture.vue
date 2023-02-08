<template>
	<div v-if="preview" class="c-video-capture overflow-hidden">
		<video ref="video" width="100%" autoplay></video>

		<div
			v-for="({ x, y, score }, index) in rawPoints"
			:key="`point-${index}`"
			:style="{
				top: `${(y / 480) * 100}%`,
				left: `${(x / 640) * 100}%`,
				opacity: score < 0.4 ? '0' : '1',
			}"
			:class="[
				'c-video-capture__point absolute',
				'w-12 h-12 rounded-full bg-tertiary',
				'transform -translate-x-1/2 -translate-y-1/2',
			]"
		></div>
	</div>
</template>

<script>
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';

export default {
	name: 'VideoCapture',
	inheritAttrs: false,

	props: {
		preview: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			imageCapture: null,
			tracks: null,

			model: null,
			detector: null,

			rawPoints: [],
			points: null,

			last: new Date().getTime(),
		};
	},

	async mounted() {
		this.start();
		this.model = poseDetection.SupportedModels.MoveNet;
		this.detector = await poseDetection.createDetector(this.model);
	},

	methods: {
		initialise(stream) {
			this.preview && (this.$refs.video.srcObject = stream);
			this.tracks = stream.getTracks();
			this.imageCapture = new ImageCapture(this.tracks[0]);

			(function tick() {
				this.imageCapture
					.grabFrame()
					.then((bitmap) => {
						window.requestAnimationFrame(tick.bind(this));
						this.onFrameUpdate(bitmap);
					})
					.catch((error) => console.error(error));
			}.apply(this));

			this.onAppUpdate();
		},

		start() {
			navigator.mediaDevices
				.getUserMedia?.({ video: true })
				.then(this.initialise)
				.catch((e) => console.error(e));
		},

		async onFrameUpdate(bitmap) {
			const poses = await this.detector?.estimatePoses?.(bitmap);
			this.rawPoints = poses?.[0]?.keypoints;
			!this.points && (this.points = this.rawPoints);
		},

		onAppUpdate() {
			window.requestAnimationFrame(this.onAppUpdate);
			const now = new Date().getTime();
			const delta = now - this.last;
			this.last = now;

			if (this.points) {
				this.points = this.points.map(({ x, y }, index) => ({
					x: this.lerp(x, this.rawPoints[index].x, 0.006 * delta),
					y: this.lerp(y, this.rawPoints[index].y, 0.006 * delta),
					score: this.rawPoints[index].score,
					name: this.rawPoints[index].name,
				}));

				this.$emit(
					'update',
					this.points.map(({ x, y, score, name }) => ({
						x: x / 640,
						y: y / 480,
						score,
						name,
					}))
				);
			}
		},

		lerp(v0, v1, t) {
			return (1 - t) * v0 + t * v1;
		},
	},
};
</script>

<style lang="postcss">
.c-video-capture__point {
	transition: opacity 200ms cubic-bezier(0.14, 0.59, 0.48, 0.9);
}

.c-video-capture__point:before {
	content: '';
	transform: scale(2);
	@apply absolute w-full h-full rounded-full;
	@apply origin-center;
	@apply bg-tertiary opacity-20;
}
</style>
