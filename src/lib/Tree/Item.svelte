<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import type { TreeItem } from './types.js';
	import { createTreeView, melt } from '@melt-ui/svelte';

	let { item, children }: { item: TreeItem; children?: Snippet<[TreeItem]> } = $props();

	let key = $derived(item.key);
	let hasChildren = $derived(item.children && item.children.length > 0);

	const {
		group,
		item: itemElement,
		isSelected,
		isExpanded
	} = getContext<{
		group: ReturnType<typeof createTreeView>['elements']['group'];
		item: ReturnType<typeof createTreeView>['elements']['item'];
		isSelected: ReturnType<typeof createTreeView>['helpers']['isSelected'];
		isExpanded: ReturnType<typeof createTreeView>['helpers']['isExpanded'];
	}>('TREE');
</script>

<li
	class="p-list-tree__item"
	class:p-list-tree__item--group={hasChildren}
	role="treeitem"
	aria-selected={$isSelected(item.key)}
>
	{#if hasChildren}
		<button
			class="p-list-tree__toggle"
			type="button"
			use:melt={$itemElement({ id: key, hasChildren })}
		>
			{#if children}
				{@render children(item)}
			{:else}
				{item.label}
			{/if}
		</button>
		{#if item.children?.length}
			<ul class="p-list-tree" use:melt={$group({ id: key })} aria-hidden={!$isExpanded(key)}>
				{#each item.children as child (child.key)}
					<svelte:self item={child} {children} />
				{/each}
			</ul>
		{/if}
	{:else if children}
		{@render children(item)}
	{:else}
		{item.label}
	{/if}
</li>
