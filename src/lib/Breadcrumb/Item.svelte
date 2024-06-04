<script lang="ts" context="module">
	import type { HTMLLiAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	export type Props = HTMLLiAttributes & HTMLAnchorAttributes;
</script>

<script lang="ts">
	let {
		children,
		class: breadcrumbItemClass,
		href,
		hreflang,
		download,
		media,
		ping,
		rel,
		target,
		type,
		referrerpolicy,
		onclick,
		...restProps
	}: Props = $props();
</script>

<li class="p-breadcrumbs__item">
	{#if href}
		<a {href} {hreflang} {download} {media} {ping} {rel} {target} {type} {referrerpolicy} {onclick}>
			{#if children}
				{@render children()}
			{/if}
		</a>
	{:else if children}
		{@render children()}
	{/if}
</li>
