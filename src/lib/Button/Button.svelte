<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { class: buttonClass, type, children, ...restProps }: HTMLButtonAttributes = $props();
</script>

<button class="p-button" type={type ?? 'button'}>
	{#if children}
		{@render children()}
	{/if}
</button>
