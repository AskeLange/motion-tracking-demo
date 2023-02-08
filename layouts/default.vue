<template>
	<div class="l-default">
		<Nuxt />
		<ThemeConfiguration />
	</div>
</template>

<script>
import ThemeConfiguration from '~/components/global/ThemeConfiguration';

export default {
	name: 'Default',
	components: { ThemeConfiguration },
};
</script>
