<script lang="ts" context="module">
	import type { HTMLLiAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	export type Props = HTMLLiAttributes & HTMLAnchorAttributes;
</script>

<script lang="ts">
	let { children, id, href, class: breadcrumbItemClass, ...restProps }: Props = $props();
</script>

<li {id} class="p-breadcrumbs__item {breadcrumbItemClass ?? ''}">
	{#if href}
		<a {href} {...restProps}>
			{#if children}
				{@render children()}
			{/if}
		</a>
	{:else if children}
		{@render children()}
	{/if}
</li>
