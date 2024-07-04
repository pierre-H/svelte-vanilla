<script lang="ts" context="module">
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLUListElement> & {
		fillEmptyItems?: 1 | 2;
	};
</script>

<script lang="ts">
	let { children, fillEmptyItems, class: matrixClass, ...restProps }: Props = $props();
</script>

<div class="p-matrix {matrixClass ?? ''}" {...restProps}>
	{#if children}
		{@render children()}
	{/if}
	{#if fillEmptyItems}
		<li class="p-matrix__item"></li>
		{#if fillEmptyItems === 2}
			<li class="p-matrix__item"></li>
		{/if}
	{/if}
</div>
