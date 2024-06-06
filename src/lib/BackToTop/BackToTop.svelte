<script lang="ts" context="module">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export type Props = HTMLAnchorAttributes;
</script>

<script lang="ts">
	let { class: anchorClass, children, ...restProps }: Props = $props();
</script>

<div class="p-top {anchorClass ?? ''}">
	<a class="p-top__link" {...restProps}>
		{#if children}
			{@render children()}
		{:else}
			Back to top
		{/if}
	</a>
</div>
