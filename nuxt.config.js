// import Prismic from '@prismicio/client';
// import { Link } from '@prismicio/helpers';
import { apiEndpoint } from './sm.json';
import { routes } from './assets/js/route-resolver.js';

export default {
	target: 'static',

	css: ['@/assets/css/main.css'],
	plugins: ['~/plugins/global-components.js'],
	buildModules: ['@nuxt/postcss8', '@nuxtjs/svg', '@nuxtjs/prismic'],

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
		title: 'Prismic Boilerplate',

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

	/**
	 * Prismic configuration, which includes the route-resolver
	 * which connects prismic types to specific pages.
	 */
	prismic: {
		endpoint: apiEndpoint,
		modern: true,
		apiOptions: { routes },
	},

	/**
	 * Example
	 * 
	 * Makes sure static pages are generated for all subpages,
	 * such that subpages that are not linked to internally,
	 * can still be accessed after deploy.
	 *
	 * https://prismic.io/docs/technologies/nuxt-define-routes#staticsite-generation
	 */
	// generate: {
	// 	routes: async () => {
	// 		const client = Prismic.client(apiEndpoint, { routes });
	// 		const pages = await client.query(
	// 			Prismic.Predicates.at('document.type', 'subpage')
	// 		);

	// 		return pages.results.map((page) =>
	// 			Link.url(page, (doc) => (doc.type === 'frontpage' ? '/' : ''))
	// 		);
	// 	},
	// },
}