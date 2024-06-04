<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLSpanElement> & {
		negative?: boolean;
		'aria-label': string;
	};
</script>

<script lang="ts">
	let { children, negative, ...restProps }: Props = $props();
</script>

<span class:p-badge={!negative} class:p-badge--negative={negative} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</span>
