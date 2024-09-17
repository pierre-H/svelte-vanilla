<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLLIElement> & {
		bullet?: boolean;
	};
</script>

<script lang="ts">
	let { bullet, children, ...restProps }: Props = $props();
</script>

<li class:p-list--divided={divided} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</li>
