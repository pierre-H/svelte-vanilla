<script lang="ts" context="module">
	import { uniqueId } from '$lib/utils/uniqueId.js';
	import { type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { createSideNavigatonStore } from './store.svelte.js';

	export type Props = HTMLAttributes<HTMLDivElement> & {
		toggle?: string | Snippet<[boolean | undefined]>;
		sticky?: boolean;
		accordion?: boolean;
		dark?: boolean;
		light?: boolean;
	};
</script>

<script lang="ts">
	import SideNavigation from './SideNavigation.svelte';

	let {
		id = uniqueId('side-navigation-'),
		toggle = 'Toggle side navigation',
		sticky,
		accordion,
		dark,
		light,
		children,
		...restProps
	}: Props = $props();

	let open = $state<boolean | undefined>(undefined);

	function toggleOpen() {
		open = open === undefined ? true : !open;
	}

	const store = createSideNavigatonStore();

	let isAccordion = $derived(accordion || store.accordionIds.length > 0);
</script>

{#snippet toggleButton(inDrawer: boolean)}
	<button
		class:p-side-navigation__toggle={!inDrawer}
		class:p-side-navigation__toggle--in-drawer={inDrawer}
		aria-controls={id}
		type="button"
		onclick={toggleOpen}
	>
		{#if typeof toggle === 'string'}
			{toggle}
		{:else}
			{@render toggle(open)}
		{/if}
	</button>
{/snippet}

<div
	class:p-side-navigation={!isAccordion}
	class:p-side-navigation--accordion={isAccordion}
	class:is-drawer-hidden={open === false}
	class:is-drawer-expanded={open}
	class:is-sticky={sticky}
	class:is-dark={dark}
	class:is-light={light}
	{id}
	{...restProps}
>
	{@render toggleButton(false)}

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="p-side-navigation__overlay"
		aria-controls={id}
		onclick={toggleOpen}
		onkeypress={toggleOpen}
	></div>

	<SideNavigation drawer>
		{#snippet header()}
			{@render toggleButton(true)}
		{/snippet}

		{#if children}
			{@render children()}
		{/if}
	</SideNavigation>
</div>
