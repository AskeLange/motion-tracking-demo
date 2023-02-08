<template>
	<div class="b-placeholder border-2 border-black w-full">
		<div
			:class="[
				'px-md py-sm border-b-2 border-black',
				'font-helvetica-neue font-medium uppercase',
			]"
			v-text="`Alias: ${alias}`"
		></div>

		<pre class="px-md py-sm w-full overflow-x-scroll" v-text="attrs"></pre>
	</div>
</template>

<script>
export default {
	name: 'BlockListPlaceholder',
	inheritAttrs: false,

	props: {
		alias: {
			type: String,
			required: false,
		},

		attrs: {
			type: Object,
			required: false,
		},
	},
};
</script>
