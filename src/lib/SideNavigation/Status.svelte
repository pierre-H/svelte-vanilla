<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLSpanElement>;
</script>

<script lang="ts">
	let { class: statusClass, children, ...restProps }: Props = $props();
</script>

<span class="p-side-navigation__status {statusClass}" {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</span>
