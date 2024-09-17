<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type Props = HTMLAttributes<HTMLUListElement>;
</script>

<script lang="ts">
	let { class: listClass, children, ...restProps }: Props = $props();
</script>

<ul class="p-side-navigation__list {listClass ?? ''}" {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</ul>
