<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { createSideNavigatonStore } from './store.svelte.js';

	export type Props = HTMLAttributes<HTMLElement> & {
		header?: Snippet;
		drawer?: boolean;
		icons?: boolean;
		accordion?: boolean;
	};
</script>

<script lang="ts">
	let { header, drawer, icons, children, accordion, ...restProps }: Props = $props();

	const store = drawer ? undefined : createSideNavigatonStore();

	let isAccordion = $derived(accordion || (store && store.accordionIds.length > 0));
</script>

<nav
	class:p-side-navigation={!drawer && !icons}
	class:p-side-navigation__drawer={drawer}
	class:p-side-navigation--icons={icons}
	class:p-side-navigation--accordion={isAccordion}
	{...restProps}
>
	{#if drawer && header}
		<div class="p-side-navigation__drawer-header">
			{@render header()}
		</div>
	{/if}

	{#if children}
		{@render children()}
	{/if}
</nav>
