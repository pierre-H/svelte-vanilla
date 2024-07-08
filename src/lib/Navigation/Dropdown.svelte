<script lang="ts" context="module">
	import { uniqueId } from '$lib/utils/uniqueId.js';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { setContext, type Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type Props = HTMLButtonAttributes & {
		label: string | Snippet;
	};
</script>

<script lang="ts">
	let {
		children,
		id = uniqueId('dropdown-'),
		class: dropdownClass,
		label,
		...restProps
	}: Props = $props();

	const {
		elements: { trigger, menu, item, separator },
		builders: { createSubmenu },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		loop: true,
		portal: null,
		arrowSize: 1,
		positioning: {
			placement: 'bottom-start',
			gutter: 0
		}
	});

	setContext('NAVIGATION_DROPDOWN', {
		item,
		separator,
		createSubmenu
	});
</script>

<li class="p-navigation__item--dropdown-toggle {dropdownClass ?? ''}" class:is-active={$open} {id}>
	<button aria-controls="{id}-menu" class="p-navigation__link" {...restProps} use:melt={$trigger}>
		{#if typeof label === 'string'}
			{label}
		{:else}
			{@render label()}
		{/if}
	</button>
	{#if $open}
		<ul class="p-navigation__dropdown" id="{id}-menu" aria-hidden={!$open} use:melt={$menu}>
			{#if children}
				{@render children()}
			{/if}
		</ul>
	{/if}
</li>

<style>
	.p-navigation__dropdown {
		transform: none !important;
	}
</style>
