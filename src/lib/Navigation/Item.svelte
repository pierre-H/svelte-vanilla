<script lang="ts" context="module">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	export type Props = HTMLAnchorAttributes & {
		selected?: boolean;
	};
</script>

<script lang="ts">
	let { selected, class: itemClass, children, ...restProps }: Props = $props();
</script>

<li class="p-navigation__item" class:is-selected={selected}>
	<a class="p-navigation__link {itemClass ?? ''}" {...restProps}>
		{#if children}
			{@render children()}
		{/if}
	</a>
</li>
