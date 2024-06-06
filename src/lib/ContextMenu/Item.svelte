<script lang="ts" context="module">
	import { createContextMenu, melt } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type Props = HTMLButtonAttributes;
</script>

<script lang="ts">
	let { children, class: itemClass, ...restProps }: Props = $props();

	const contextMenuContext = getContext<{
		item: ReturnType<typeof createContextMenu>['elements']['item'];
	}>('CONTEXT_MENU');

	if (!contextMenuContext?.item) {
		throw new Error('CONTEXT_MENU context not found');
	}

	const { item } = contextMenuContext;
</script>

<button class="p-contextual-menu__link {itemClass ?? ''}" {...restProps} use:melt={$item}>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.p-contextual-menu__link {
		padding-left: 32px;
	}

	.p-contextual-menu__link:focus-visible {
		outline: none;
	}
</style>
