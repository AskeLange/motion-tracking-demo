<!--
	Last modified: 2022/09/23 11:52:54
-->
<script>
/**
 * A transition wrapper element, extending the functionalities
 * of the Transition (and TransitionGroup) component(s).
 * @displayName TransitionExt
 */
export default {
	name: 'TransitionExt',

	functional: true,

	props: {
		/**
		 * Whether to use the TransitionGroup component instead of Transition.
		 */
		isGroup: {
			type: Boolean,
			default: false,
		},

		/**
		 * The name of the transition class to use, will be prefixed with the
		 * namePrefix.
		 */
		name: {
			type: String,
			default: '',
		},

		/**
		 * The prefix to prepend to the name.
		 */
		namePrefix: {
			type: String,
			default: 't-',
		},

		/**
		 * Whether it is using transition or animation (to set the right duration).
		 * @values 'transition', 'animation'
		 */
		type: {
			type: String,
			default: 'transition',
			validator: function (value) {
				return ['transition', 'animation'].indexOf(value) !== -1;
			},
		},

		/**
		 * The duration of the transition.
		 */
		duration: {
			type: [String, Number, Object],
			default: null,
		},

		/**
		 * Whether the transition uses CSS (setting false will also overrule the
		 * "inline-css" property).
		 */
		css: {
			type: Boolean,
			default: true,
		},

		/**
		 * Whether the transition should set inline "transition/animation-duration"
		 * styles based on the set duration.
		 */
		inlineCss: {
			type: Boolean,
			default: true,
		},
	},

	render(h, ctx) {
		// Structuring the bindings object
		const { props, slots, data } = ctx;
		const bindings = {
			...data,
			on: data?.on || {},
			attrs: {
				...(data?.attrs || {}),
				name: props.name ? (props.namePrefix || '') + props.name : '',
				duration: props.duration,
				css: props.css,
			},
		};

		// When inline styles are used and a duration is set we need to inject a set of hooks into the bindings
		if (props.inlineCss && props.css) {
			const actionHooks = {
				'before-enter': extractDuration(props.duration, 'enter'),
				'after-enter': null,
				'before-leave': extractDuration(props.duration, 'leave'),
				'after-leave': null,
				'leave-cancelled': null,
			};

			for (const key in actionHooks) {
				bindings.on[key] = flatten([
					(elm) => {
						setDuration(elm, actionHooks[key]);
					},
					bindings.on[key],
				]).filter(Boolean);
			}
		}

		// Finally we create the actual transition element
		const Tag = props.isGroup ? 'TransitionGroup' : 'Transition';
		return <Tag {...bindings}>{slots?.()?.default}</Tag>;

		// Helper method for setting the set duration as inline styles on the transitioned element
		function setDuration(elm, duration) {
			if (elm) {
				elm.dataset.TransitionExtAddedStyle =
					elm.dataset.TransitionExtAddedStyle || '';
				if (props.inlineCss && props.css) {
					const styleArray = (
						elm.dataset.TransitionExtAddedStyle
							? elm.style.cssText.split(
									elm.dataset.TransitionExtAddedStyle
							  )
							: [elm.style.cssText]
					).filter(Boolean);

					if (typeof duration === 'number') {
						elm.dataset.TransitionExtAddedStyle = `${props.type}-duration: ${duration}ms !important;`;
						styleArray.push(elm.dataset.TransitionExtAddedStyle);
					} else {
						elm.removeAttribute('data-spa-transition-added-style');
						delete elm.dataset.TransitionExtAddedStyle;
					}

					elm.style.cssText = styleArray
						.filter(Boolean)
						.join(';')
						.replace(/\s{2,}/g, ' ');
				} else {
					elm.removeAttribute('data-spa-transition-added-style');
					delete elm.dataset.TransitionExtAddedStyle;
				}
			}
		}

		// Helper method for flattening the event arrays - not using array.flat due to possible compatibility issues
		function flatten(array) {
			if (Array.isArray(array)) {
				const newArray = [];
				array.forEach((item) => {
					if (Array.isArray(item)) {
						newArray.push(...flatten(item));
					} else {
						newArray.push(item);
					}
				});
				return newArray;
			}
			return array;
		}

		// Helper method for extracting the right duration
		function extractDuration(duration, key) {
			switch (typeof duration) {
				case 'number':
				case 'string':
					return Number(duration);
				case 'object':
					return duration?.[key] || null;
			}
			return null;
		}
	},
};
</script>
