<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { useAccordion } from './store.svelte.js';

	export type Props = HTMLAttributes<HTMLLIElement> & {
		open?: boolean;
		label: string | Snippet<[boolean]>;
	};
</script>

<script lang="ts">
	let {
		class: accordionClass,
		open = $bindable(false),
		label,
		children,
		...restProps
	}: Props = $props();

	useAccordion();

	function toggle() {
		open = !open;
	}
</script>

<li class="p-side-navigation__item {accordionClass ?? ''}" {...restProps}>
	<button class="p-side-navigation__accordion-button" aria-expanded={open} onclick={toggle}>
		{#if typeof label === 'string'}
			{label}
		{:else}
			{@render label(open)}
		{/if}
	</button>
	<!-- svelte-ignore a11y_role_supports_aria_props_implicit -->
	<ul class="p-side-navigation__list" aria-expanded={open}>
		{#if children}
			{@render children()}
		{/if}
	</ul>
</li>
