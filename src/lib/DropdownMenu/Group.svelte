<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLSpanElement>;
</script>

<script lang="ts">
	let { children, class: groupClass, ...restProps }: Props = $props();
</script>

<span class="p-contextual-menu__group {groupClass ?? ''}" {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</span>
