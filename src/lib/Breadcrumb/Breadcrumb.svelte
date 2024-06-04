<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLElement> & {};
</script>

<script lang="ts">
	let {
		children,
		class: breadcrumbsClass,
		'aria-label': ariaLabel,
		...restProps
	}: Props = $props();
</script>

<nav class="p-breadcrumbs {breadcrumbsClass ?? ''}" aria-label={ariaLabel ?? 'Breadcrumbs'}>
	<ol class="p-breadcrumbs__items">
		{#if children}
			{@render children()}
		{/if}
	</ol>
</nav>
