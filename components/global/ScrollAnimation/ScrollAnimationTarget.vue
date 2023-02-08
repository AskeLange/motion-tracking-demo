<template>
	<div class="c-scroll-animation-target">
		<slot v-bind="slotBindings"></slot>
	</div>
</template>

<script>
import { state } from './ScrollAnimationController.vue';

export default {
	name: 'ScrollAnimationTarget',
	inheritAttrs: false,

	props: {
		mode: {
			type: String,
			default: 'position',
			validator: (value) =>
				['position', 'visibility', 'container'].includes(value),
		},

		/**
		 * Set to false to disable the auto-removal and
		 * auto-add of listeners, when the target is in
		 * the viewport - can be useful, as this can cause
		 * issues with fixed elements.
		 */
		autoOptimize: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			isIntersecting: false,
			percentageX: 0,
			percentageY: 0,
			width: 0,
			height: 0,
		};
	},

	computed: {
		slotBindings() {
			return {
				isIntersecting: this.isIntersecting,
				percentageX: this.percentageX,
				percentageY: this.percentageY,
				triggerUpdate: this.update,
			};
		},

		root() {
			return state._observer?.root ?? window;
		},
	},

	watch: {
		slotBindings: {
			immediate: true,
			handler(value) {
				this.$emit('change', value);
			},
		},
	},

	mounted() {
		this.$nextTick(() => {
			this.autoOptimize && state.addTarget(this.$el, this.onIntersection);
			!this.autoOptimize && this.addListeners();

			this.$watch(
				() => this.root,
				() => this.addListeners()
			);
		});
	},

	beforeDestroy() {
		this.autoOptimize && state.removeTarget(this.$el);
		this.removeListeners();
	},

	methods: {
		onIntersection({ isIntersecting }) {
			this.isIntersecting = isIntersecting;
			const action = isIntersecting ? 'addListeners' : 'removeListeners';
			this[action]();
		},

		update(event) {
			switch (this.mode) {
				case 'position': {
					this.getPositionPercentage();
					break;
				}

				case 'visibility': {
					this.getVisibilityPercentage();
					break;
				}
			}

			this.$emit('scroll', {
				target: state._observer?.root ?? window,
				...event,

				isIntersecting: this.isIntersecting,
				percentageY: this.percentageY,
				percentageX: this.percentageX,
				width: this.width,
				height: this.height,
			});
		},

		/**
		 * Modes
		 */
		getPositionPercentage() {
			if (state._observer) {
				const { $el: el } = this;
				const { top, left, width, height } = el.getBoundingClientRect();

				const { root } = state._observer;
				const { innerWidth: iw, innerHeight: ih } = window;

				let outerRect;
				!root && (outerRect = { width: iw, height: ih });
				root && (outerRect = root.getBoundingClientRect());
				const { width: rootWidth, height: rootHeight } = outerRect;

				this.percentageY = 1 + -(top + height) / (rootHeight + height);
				this.percentageX = 1 + -(left + width) / (rootWidth + width);
				this.width = width;
				this.height = height;
			}
		},

		getVisibilityPercentage() {
			const { $el: el } = this;
			const { top, left, width, height } = el.getBoundingClientRect();

			this.percentageX = Math.min(
				-(left - window.innerWidth) / width,
				1 + left / width
			);

			this.percentageY = Math.min(
				-(top - window.innerHeight) / height,
				1 + top / height
			);

			this.percentageX = Math.max(Math.min(this.percentageX, 1), 0);
			this.percentageY = Math.max(Math.min(this.percentageY, 1), 0);
			this.width = width;
			this.height = height;
		},

		/**
		 * Helper functions
		 */
		addListeners() {
			this.root?.addEventListener('scroll', this.update);
			window.addEventListener('resize', this.update);
		},

		removeListeners() {
			this.root?.removeEventListener('scroll', this.update);
			window.removeEventListener('resize', this.update);
		},
	},
};
</script>
