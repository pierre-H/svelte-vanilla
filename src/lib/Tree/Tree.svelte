<script lang="ts" context="module">
	import { createSync, createTreeView, melt } from '@melt-ui/svelte';
	import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { TreeItem } from './types.js';

	export type Props = Omit<HTMLAttributes<HTMLUListElement>, 'children'> & {
		items: TreeItem[];
		defaultExpanded?: string[];
		expanded?: string[];
		onExpandedChange?: ChangeFn<string[]>;
		children?: Snippet<[TreeItem]>;
	};
</script>

<script lang="ts">
	import Item from './Item.svelte';
	import { setContext, type Snippet } from 'svelte';

	let {
		items,
		defaultExpanded = [],
		expanded = $bindable(defaultExpanded),
		onExpandedChange,
		class: treeClass,
		children,
		...restProps
	}: Props = $props();

	const {
		states,
		elements: { tree, item, group },
		helpers: { isSelected, isExpanded }
	} = createTreeView({
		defaultExpanded,
		onExpandedChange
	});

	setContext('TREE', { item, group, isSelected, isExpanded });

	const sync = createSync(states);

	$effect(() => {
		sync.expanded(expanded, (e) => (expanded = e));
	});
</script>

<ul
	class="p-list-tree {treeClass ?? ''}"
	aria-multiselectable="true"
	role="tree"
	{...restProps}
	use:melt={$tree}
>
	{#each items as anItem (anItem.key)}
		<Item item={anItem} {children} />
	{/each}
</ul>
