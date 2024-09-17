<script lang="ts" module>
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	export type Props = HTMLButtonAttributes & HTMLAnchorAttributes;
</script>

<script lang="ts">
	let { children, class: itemClass, href, ...restProps }: Props = $props();

	const contextMenuContext = getContext<{
		item: ReturnType<typeof createDropdownMenu>['elements']['item'];
	}>('DROPDOWN_MENU');

	if (!contextMenuContext?.item) {
		throw new Error('DROPDOWN_MENU context not found');
	}

	const { item } = contextMenuContext;
</script>

{#if href}
	<a class="p-contextual-menu__link {itemClass ?? ''}" {...restProps} use:melt={$item} {href}>
		{#if children}
			{@render children()}
		{/if}</a
	>
{:else}
	<button class="p-contextual-menu__link {itemClass ?? ''}" {...restProps} use:melt={$item}>
		{#if children}
			{@render children()}
		{/if}
	</button>
{/if}

<style>
	.p-contextual-menu__link {
		padding-left: 32px;
	}

	.p-contextual-menu__link:focus-visible {
		outline: none;
	}
</style>
