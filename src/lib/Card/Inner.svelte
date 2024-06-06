<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: innerClass, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="p-card__inner {innerClass}" {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
