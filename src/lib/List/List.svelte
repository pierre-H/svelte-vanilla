<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLUListElement> & {
		divided?: boolean;
	};
</script>

<script lang="ts">
	let { divided, children, ...restProps }: Props = $props();
</script>

<ul class:p-list--divided={divided} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</ul>
