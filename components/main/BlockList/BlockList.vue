<template>
	<div class="c-block-list space-y-xl">
		<template v-for="(block, index) in computedBlocks">
			<Component
				:is="getBlockFromAlias(block.alias)"
				v-if="getBlockFromAlias(block.alias)"
				:key="`block-${index}`"
				v-bind="block.attrs"
			/>

			<BlockPlaceholder v-else :key="`block-${index}`" v-bind="block" />
		</template>
	</div>
</template>

<script>
const blocks = {
	BlockListPlaceholder: () =>
		import(
			/* webpackChunkName: "blockListPlaceholder" */ './blocks/BlockListPlaceholder.vue'
		),
};

const blockMap = {};

export default {
	name: 'BlockList',
	components: blocks,

	props: {
		items: {
			type: Array,
			default: () => [],
		},
	},

	computed: {
		computedBlocks() {
			return this.items.map((item) => {
				return {
					alias: item['slice_type'],
					attrs: {
						items: item?.items,
						...(item.primary ?? {}),
					},
				};
			});
		},
	},

	methods: {
		getBlockFromAlias(alias) {
			return blockMap[alias];
		},
	},
};
</script>
