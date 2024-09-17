<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement> & {
		dark?: boolean;
		header?: string | Snippet;
	};
</script>

<script lang="ts">
	let { children, class: panelClass, dark, header, ...restProps }: Props = $props();
</script>

<div class="p-panel {panelClass ?? ''}" class:is-dark={dark} {...restProps}>
	{#if header}
		<div class="p-panel__header">
			{#if typeof header === 'string'}
				<h4 class="p-panel__title">{header}</h4>
			{:else}
				{@render header()}
			{/if}
		</div>
	{/if}
	{#if children}
		<div class="p-panel__content">
			{@render children()}
		</div>
	{/if}
</div>
