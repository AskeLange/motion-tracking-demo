<template>
	<div
		:ratio="ratio"
		:class="[
			'c-responsive-image-ext',
			{ 'c-responsive-image-ext--is-intersecting': isIntersecting },
			{ 'c-responsive-image-ext--has-intersected': hasIntersected },
		]"
	>
		<ResponsiveImage
			v-bind="{ ...$props }"
			class="w-full h-full object-center"
			:style="`object-fit: ${fit}`"
			sizes="auto"
			lazyload
		/>
	</div>
</template>

<script>
import 'lazysizes';
import ResponsiveImage from '@limbo-works/vue-responsive-image';

export default {
	name: 'ResponsiveImageExt',
	components: { ResponsiveImage },
	inheritAttrs: false,

	props: {
		...ResponsiveImage.props,

		fit: {
			type: String,
			default: 'cover',
		},

		ratio: {
			type: String,
			required: false,
		},
	},
};
</script>
