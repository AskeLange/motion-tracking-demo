export default {
	target: 'static',

	css: ['@/assets/css/main.css'],
	plugins: ['~/plugins/global-components.js'],
	buildModules: ['@nuxt/postcss8', '@nuxtjs/svg'],

	build: {
		postcss: {
			plugins: {
				tailwindcss: {},
				autoprefixer: {},
			},
		},
	},

	/**
	 * Used for lazyloading images by the
	 * responsive image package
	 */
	lazySizes: {
		config: {
			init: false,
			loadingClass: 'is-lazyloading',
			loadedClass: 'is-lazyloaded',
		},

		plugins: ['parent-fit'],
	},

	/**
	 * Default head, not much else to say.
	 */
	head: {
		title: 'Motion Tracking Demo',

		htmlAttrs: {
			lang: 'en',
		},

		meta: [
			{ charset: 'utf-8' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
		],

		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
}