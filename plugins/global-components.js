import Vue from 'vue';

import NuxtLinkExt from '~/components/global/NuxtLinkExt';
import TransitionExt from '~/components/global/TransitionExt';
import ResponsiveImageExt from '~/components/global/ResponsiveImageExt';

const components = {
	NuxtLinkExt,
	TransitionExt,
	ResponsiveImageExt,
};

Object.entries(components).forEach(([name, component]) => {
	Vue.component(name, component);
});
