<template>
	<div class="l-error">
		<div class="b-error grid-wrapper">
			<div class="col-start-1 col-end-6">
				<h2
					class="font-normal mb-32 text-xl >=768:text-3xl"
					v-text="error.statusCode"
				></h2>
				<h1
					class="font-bold mb-24 uppercase text-5xl >=768:text-8xl"
					v-text="error.message"
				></h1>
				<NuxtLink
					to="/"
					class="uppercase"
					v-text="'Back to home page'"
				></NuxtLink>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['error'],
};
</script>
