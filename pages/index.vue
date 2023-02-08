<template>
	<div class="p-frontpage"></div>
</template>

<script>
export default {
	name: 'FrontPage',

	async asyncData({ $prismic, error }) {
		const document = await $prismic.api.getSingle('frontpage');

		if (!document) {
			error({ statusCode: 404, message: 'Page not found' });
			return;
		}

		return document;
	},
};
</script>
