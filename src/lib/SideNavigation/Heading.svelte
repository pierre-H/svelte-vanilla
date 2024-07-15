<script lang="ts" context="module">
	import type { OptionalLink } from '$lib/utils/OptionalLink.js';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLHeadElement> &
		OptionalLink & {
			currentPage?: boolean;
		};
</script>

<script lang="ts">
	let {
		class: headingClass,
		href,
		hreflang,
		download,
		media,
		ping,
		rel,
		target,
		type,
		referrerpolicy,
		children,
		currentPage,
		...restProps
	}: Props = $props();

	let linked = $derived(!!href);
</script>

<h3
	class={headingClass}
	class:p-side-navigation__heading={!linked}
	class:p-side-navigation__heading--linked={linked}
	{...restProps}
>
	{#if linked}
		<a
			class="p-side-navigation__link"
			aria-current={currentPage ? 'page' : undefined}
			{href}
			{hreflang}
			{download}
			{media}
			{ping}
			{rel}
			{target}
			{type}
			{referrerpolicy}
		>
			{#if children}
				{@render children()}
			{/if}</a
		>
	{:else if children}
		{@render children()}
	{/if}
</h3>
