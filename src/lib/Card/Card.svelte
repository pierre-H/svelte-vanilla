<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement> & {
		noPadding?: boolean;
		header?: string | Snippet;
		highlighted?: boolean;
		overlay?: boolean;
	};
</script>

<script lang="ts">
	let { children, header, highlighted, overlay, ...restProps }: Props = $props();
</script>

<div
	class:p-card={!highlighted && !overlay}
	class:p-card--highlighted={highlighted}
	class:p-card--overlay={overlay}
	{...restProps}
>
	{#if typeof header === 'string'}
		<h3>{header}</h3>
	{:else if header}
		{@render header()}
	{/if}
	<p class="p-card__content">
		{#if children}
			{@render children()}
		{/if}
	</p>
</div>
