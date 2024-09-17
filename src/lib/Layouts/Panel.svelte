<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLDivElement> & {
		dark?: boolean;
		header?: string | Snippet;
		fixedWidth?: boolean;
		controls?: Snippet;
	};
</script>

<script lang="ts">
	let { children, class: panelClass, dark, header, fixedWidth, controls, ...restProps }: Props = $props();
</script>

<div class="p-panel {panelClass ?? ''}" class:is-dark={dark} {...restProps}>
	{#if header || controls}
		<div class="p-panel__header">
			{#if typeof header === 'string'}
				<h4 class="p-panel__title">{header}</h4>
			{:else if header}
				{@render header()}
			{/if}
			{#if controls}
				<div class="p-panel__controls">
					{@render controls()}
				</div>
			{/if}
		</div>
	{/if}
	{#if children}
		<div class="p-panel__content">
			{#if fixedWidth}
				<div class="u-fixed-width">
					{@render children()}
				</div>
			{:else}
				{@render children()}
			{/if}
		</div>
	{/if}
</div>
