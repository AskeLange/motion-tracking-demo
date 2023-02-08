<template>
	<div v-if="$scopedSlots.default" class="c-scroll-animation-controller">
		<slot></slot>
	</div>
</template>

<script>
import Vue from 'vue';
export const state = Vue.observable({
	_targets: [],
	_observer: null,
	_root: null,

	addTarget(element, callback) {
		this._observer?.observe(element);
		this._targets.push({
			callback,
			element,
		});
	},

	removeTarget(element) {
		const index = this._targets.findIndex(
			(target) => target.element == element
		);

		if (index !== -1) {
			this._observer.unobserve(element);
			this._targets.splice(index, 1);
		}
	},
});

export default {
	name: 'ScrollAnimationController',
	inheritAttrs: false,

	props: {
		observerConfig: {
			type: Object,
			default: () => ({}),
		},
	},

	mounted() {
		const root =
			this.observerConfig.root ??
			this.$slots.default?.[0]?.elm ??
			document;

		state._root = root;
		state._observer = new IntersectionObserver(this.onIntersection, {
			...this.observerConfig,
			root,
		});

		state._targets.forEach((target) => {
			state._observer.observe(target?.element);
		});
	},

	beforeDestroy() {
		state._observer.disconnect();
	},

	methods: {
		onIntersection(intersections) {
			intersections.forEach((intersection) => {
				state._targets
					.find((target) => target.element == intersection.target)
					?.callback?.(intersection);
			});
		},
	},
};
</script>
