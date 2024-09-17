<script lang="ts" module>
	export interface Props {
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	let { children }: Props = $props();
</script>

<span class="p-code-snippet__line">
	{#if children}{@render children()}{/if}
</span>
