<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: pClass, children, ...restProps }: HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p class="p-card__content {pClass}" {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</p>
