<script lang="ts" context="module">
	import type { OptionalLink } from '$lib/utils/OptionalLink.js';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLLIElement> &
		OptionalLink & {
			currentPage?: boolean;
		};
</script>

<script lang="ts">
	let {
		class: itemClass,
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
		title,
		currentPage,
		...restProps
	}: Props = $props();

	let linked = $derived(!!href);
</script>

<li
	class={itemClass}
	class:p-side-navigation__item={!title}
	class:p-side-navigation__item--title={!!title}
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
			{/if}
		</a>
	{:else if children}
		<span class="p-side-navigation__text" aria-current={currentPage ? 'page' : undefined}>
			{@render children()}
		</span>
	{/if}
</li>
