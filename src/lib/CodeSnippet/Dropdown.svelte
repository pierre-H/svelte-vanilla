<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';

	let {
		children,
		class: className,
		value = $bindable(),
		...restProps
	}: HTMLSelectAttributes = $props();
</script>

<select class="p-code-snippet__dropdown {className ?? ''}" {...restProps} bind:value>
	{#if children}
		{@render children()}
	{/if}
</select>
