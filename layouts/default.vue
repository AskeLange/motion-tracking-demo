<template>
	<div class="l-default">
		<Nuxt />
		<ThemeConfiguration />
		<DeveloperTools />
	</div>
</template>

<script>
import ThemeConfiguration from '~/components/global/ThemeConfiguration';
import DeveloperTools from '~/components/global/DeveloperTools';

export default {
	name: 'Default',

	components: {
		ThemeConfiguration,
		DeveloperTools,
	},
};
</script>
