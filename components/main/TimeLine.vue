<template>
	<div
		:class="[
			'c-time-line',
			'fixed top-1/2 left-0 w-full',
			'transform -translate-y-1/2 h-12',
		]"
	>
		<div
			:class="[
				'absolute top-1/2 w-full border border-secondary',
				'transform -translate-y-1/2',
			]"
		></div>

		<div
			:class="[
				'absolute top-1/2 bg-secondary',
				'rounded-full transition-opacity duration-200 ease-smooth-out',
				{ 'opacity-0': !active },
			]"
			:style="{
				transform: `translate3d(calc(${percentage} * 100vw - 50%), -50%, 0)`,
				width: '32px',
				height: '32px',
			}"
		></div>
	</div>
</template>

<script>
export default {
	name: 'TimeLine',
	inheritAttrs: false,

	props: {
		percentage: {
			type: Number,
			default: -1,
		},

		active: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
