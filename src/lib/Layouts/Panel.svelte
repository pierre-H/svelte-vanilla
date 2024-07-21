<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement> & {
		dark?: boolean;
	};
</script>

<script lang="ts">
	let { children, class: panelClass, dark, ...restProps }: Props = $props();
</script>

<div class="p-panel {panelClass ?? ''}" class:is-dark={dark} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
