<svelte:options preserveWhitespace={true} />

<script lang="ts" module>
	export type CodeSnippetProps = {
		bordered?: boolean;
		header?: string | Snippet<[]>;
		icon?: true | 'windows' | 'url';
		numbered?: boolean;
		stacked?: boolean;
		wrapped?: boolean;

		dropdowns?: Snippet;
		children: Snippet;
		footer?: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		bordered,
		header,
		icon,
		numbered,
		stacked,
		wrapped,
		children,
		dropdowns,
		footer
	}: CodeSnippetProps = $props();
</script>

<div class="p-code-snippet" class:is-bordered={bordered}>
	{#if header}
		<div class="p-code-snippet__header" class:is-stacked={stacked}>
			<h5 class="p-code-snippet__title">
				{#if typeof header === 'string'}
					{header}
				{:else}
					{@render header()}
				{/if}
			</h5>
			{#if dropdowns}
				<div class="p-code-snippet__dropdowns">
					{@render dropdowns()}
				</div>
			{/if}
		</div>
	{/if}

	<pre
		class:p-code-snippet__block--numbered={numbered}
		class:p-code-snippet__block={!icon && !numbered}
		class:p-code-snippet__block--icon={icon !== undefined}
		class:is-windows-prompt={icon === 'windows'}
		class:is-url={icon === 'url'}
		class:is-wrapped={wrapped}>{@render children()}</pre>
	{#if footer}
		{@render footer()}
	{/if}
</div>

<style>
	:global(.p-code-snippet__block--numbered > code) {
		display: flex;
		flex-direction: column;
	}
</style>
